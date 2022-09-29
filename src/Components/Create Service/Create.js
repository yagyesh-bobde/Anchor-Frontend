import React, { useState, useContext, useEffect } from "react";
import "./Create.css";
import ServiceContext from "../../Context/services/serviceContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "../Editor/Editor";


function Create(props) {
  const context = useContext(ServiceContext);
  const navigate = useNavigate();
  const { slugCount, getslugcount, addservice, Uploadfile } = context;

  const [previewSourceOne, setPreviewSourceOne] = useState(""); // saves the data of file selected in the form
  const [previewSourceTwo, setPreviewSourceTwo] = useState(""); // saves the data of file selected in the form
  const [Content, setContent] = useState("Please describe your service briefly..")
  const [data, setdata] = useState({
    sname: "",
    sdesc: "",
    slug: "",
    smrp: 0,
    ssp: 0,
    sbanner: "",
    sdoc: "",
  });

  /// TAGS

  const [tags, setTags] = useState([])

  const handleKeyDown = (e) =>{
    if(e.key !== "Enter") return
    const value = e.target.value
    if(!value.trim()) return
    setTags([...tags, value])
    e.target.value = ""
  }

  const removeTag = (index) =>{
    setTags(tags.filter((e,i) => i !== index))
  }

  useEffect(() => {
    let slug = data.sname.split(" ").join("-");
    setdata({ ...data, slug: slug });
    getslugcount(slug.toLowerCase());

    // eslint-disable-next-line
  }, [data.sname]);

  const handleChangeFileOne = (e) => {
    const file = e.target.files[0];
    setPreviewSourceOne(file);
  };
  const handleChangeFileTwo = (e) => {
    const file = e.target.files[0];
    setPreviewSourceTwo(file);
  };

  const data1 = new FormData();
  const data2 = new FormData();
  data1.append("file", previewSourceOne);
  data2.append("file", previewSourceTwo);

  const handleOptionChange = () => {
    //  balancing the changing effect of free and paid option
    const select = document.getElementById("stype");
    var value = select?.options[select.selectedIndex].value;
    if (value === "free") {
      document.querySelector("#smrp").style.display = "none";
      document.querySelector("#ssp").style.display = "none";
      document.querySelectorAll(".price_label")[0].style.display = "none";
      document.querySelectorAll(".price_label")[1].style.display = "none";
    }
    if (value === "paid") {
      document.querySelector("#smrp").style.display = "block";
      document.querySelector("#ssp").style.display = "block";
      document.querySelectorAll(".price_label")[0].style.display = "block";
      document.querySelectorAll(".price_label")[1].style.display = "block";
    }
  };

  // Auto resize of textare
  const textarea = document.querySelector("#ldesc");
  textarea?.addEventListener("input", autoResize, false);

  const textarea2 = document.querySelector("#sdesc");
  textarea2?.addEventListener("input", autoResize, false);

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  // Submit of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.progress(0);
    if (
      data.sname.length > 3 &&
      data.sdesc.length > 5 &&
      Content.length > 10 &&
      previewSourceOne &&
      previewSourceTwo
    ) {
      try {
        toast.loading("Please wait...", {
          position: "top-center",
        });
        const select = document.getElementById("stype");
        var value = select.options[select.selectedIndex].value;
        var banner = await Uploadfile(data1);
        var doc = await Uploadfile(data2);
        if (banner.success && doc.success) {
          props.progress(75);
          const json = await addservice(
            data.sname,
            data.sdesc,
            Content,
            slugCount === 0
              ? data.slug.toLowerCase()
              : data.slug.toLowerCase().concat("--", `${slugCount + 1}`),
            banner.url,
            doc.url,
            tags,
            0,
            value === "free" ? false : true,
            value === "free" ? 0 : data.smrp,
            value === "free" ? 0 : data.ssp
          );
          if (json.success) {
            setdata({
              sname: "",
              sdesc: "",
              smrp: 0,
              slug: "",
              ssp: 0,
              sbanner: "",
              sdoc: "",
            });
            navigate(`/c/${localStorage.getItem("c_id")}`);
          } else {
            toast.error(`Service Not Added Please Try Again`, {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          toast.error(`Service Not Added Please hello Try Again`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error(`Service Not Added: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      toast.info("Mandatory fields cannot be empty or short in size", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    props.progress(100);
  };

  // Change in values of input tags
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="create_box">
        <h1>Create Service</h1>
        <form className="entries" onSubmit={handleSubmit}>
          <div>
            <div className="left_entry_box">
              <label htmlFor="sname" className="entry_labels">
                Service Name <small>*</small>
              </label>
              <input
                type="text"
                name="sname"
                id="sname"
                onChange={handleChange}
                value={data.sname}
                placeholder="25JS Interview Important Question..."
              />
              <label htmlFor="sdesc" className="entry_labels">
                Service Description <small>*</small>
              </label>
              <textarea
                name="sdesc"
                onChange={handleChange}
                value={data.sdesc}
                id="sdesc"
                placeholder="Please catchy line to download..."
              />
              <label htmlFor="sbanner" className="entry_labels">
                Banner Image <small>*</small>
              </label>
              <input
                type="text"
                name="sbanner"
                id="sbanner"
                placeholder="Upload file..."
                onFocus={(e) => {
                  e.target.type = "file";
                }}
                onChange={handleChangeFileOne}
              />
            </div>

            <div className="right_entry_box">
              <label htmlFor="stype" className="entry_labels">
                Service Type <small>*</small>
              </label>
              <select id="stype" onChange={handleOptionChange}>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              <label htmlFor="smrp" className="entry_labels price_label">
                Set MRP <small>*</small>
              </label>
              <input
                type="number"
                name="smrp"
                id="smrp"
                placeholder="Eg. 299"
                onChange={handleChange}
                value={data.smrp}
              />
              <label htmlFor="ssp" className="entry_labels price_label">
                Selling Price <small>*</small>
              </label>
              <input
                type="number"
                name="ssp"
                id="ssp"
                placeholder="Eg. 199"
                onChange={handleChange}
                value={data.ssp}
                max={data.smrp}
              />

              <label htmlFor="sdoc" className="entry_labels">
                Document ( supported .pdf) <small>*</small>
              </label>
              <input
                type="text"
                name="sdoc"
                id="sdoc"
                placeholder="Upload file..."
                onFocus={(e) => {
                  e.target.type = "file";
                }}
                onChange={handleChangeFileTwo}
              />

            <label htmlFor="stags" className="entry_labels">
                Tags
              </label>
                <div className="tag-container">
                  {tags?.map((tag,index)=>{
                    return (<div className="tag" key={index}>
                    <span>{tag}</span>
                    <i class="fa-solid fa-circle-xmark" onClick={()=> removeTag(index)}></i>  
                  </div>) 
                  })}
                    <input type="text" onKeyDown={handleKeyDown} name="stags" id="stags" placeholder="Type tags..."/>
                </div>
            </div>

          </div>
        </form>
          <label htmlFor="ldesc" className="editor_entry_labels">
            Long Description <small>*</small>
          </label>
        <Editor readOnly = {false} content={Content} setContent={setContent} className="text_editor"/>
          <button className="submit_button" onClick={handleSubmit}>
            Submit and Publish
          </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Create;
