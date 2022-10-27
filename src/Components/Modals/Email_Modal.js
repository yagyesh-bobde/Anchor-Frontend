import React, { useContext, useState, useEffect } from "react";
import "./Model.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { creatorContext } from "../../Context/CreatorState";
import ReactEditor from "../Editor/Editor";

function Email_Model_One({
  open,
  onClose,
  progress,
  creatorID,
  serviceName,
  serviceSlug,
  serviceCopyURL,
}) {
  const context = useContext(creatorContext);
  const {
    getAllSubscribers,
    getSubsInfo,
    getBasicCreatorInfo,
    basicCreatorInfo,
  } = context;

  const [users, setUsers] = useState(0);
  const [sending, setsending] = useState(false);

  useEffect(() => {
    getBasicCreatorInfo(creatorID).then(() => {});
    getUserMails();
  }, []);

  //EMail Sending API Context

  const getUserMails = async () => {
    const subsData = await getAllSubscribers();
    const subsInfod = await getSubsInfo(subsData);
    if (subsInfod.length !== 0) {
      let users = "";
      for (let index = 0; index < subsInfod.length; index++) {
        let email = subsInfod[index]?.email ? subsInfod[index]?.email : "";
        users = users + email + ",";
      }
      setUsers(users.split(",").filter((e) => e.length !== 0).length);
      return users;
    }
    return null;
  };

  const sendMail = async (userMails) => {
    const res = await fetch(
      "https://6ht3n8kja3.execute-api.ap-south-1.amazonaws.com/sendEmail",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorName: basicCreatorInfo?.name,
          senderEmail: `${basicCreatorInfo?.name
            ?.split(" ")
            .join("_")
            .toLowerCase()}@anchors.in`,
          receiverEmail: "singhyuvraj0506@gmail.com,raviahirwar660@gmail.com",
          message: {
            greet: "Hey Buddy",
            main: `This is your friend ${basicCreatorInfo?.name} and I hope you enjoyed all the resources over Anchors.\nRecently I uploaded one more resource on <b>\"${serviceName}\"</b>.I think you gonna love this and find it helpful.\nSo what are you waiting for Check here...`,
            closing: `Your Friend`,
          },
          subject: `Message from ${basicCreatorInfo?.name}`,
          buttonText: "Go to Service",
          link: `https://www.anchors.in/r/${serviceCopyURL}`,
        }),
      }
    );
    console.log(res);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    progress(0);
    setsending(true);
    //mixpanel.track("Email Sent to Subscribers", {
    //    serviceName: "The Service Name",
    //    creatorName: "CreatorName"
    //})
    const userMails = await getUserMails();
    console.log(userMails);
    if (userMails) {
      await sendMail(userMails);
      toast.success("Email Sent Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      onClose();
    } else {
      console.log("No Subscribers");
    }
    progress(100);
    setsending(false);
    //setsent(true)
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="model">
        <div onClick={(e) => e.stopPropagation()} className="model_main_box">
          <span className="model_question">
            <span style={{ color: "green" }}>{users}</span>
            <br /> Total Subscribers
          </span>
          <span className="model_gyan">
            this email will be send to {users}, to notify about the service. Are
            you sure you want to send email to them?
          </span>

          <div className="model_buttons">
            <button className="model_button" onClick={onClose}>
              Cancel
            </button>
            <button className="model_button" onClick={handleSubmitEmail}>
              {!sending ? <>Please Send</> : <>Sending...</>}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function Email_Model_Two({
  open,
  onClose,
  progress,
  creatorID,
  serviceName,
  serviceSlug,
  serviceCopyURL,
  serviceBanner
}) {
  const context = useContext(creatorContext);
  const {
    getAllSubscribers,
    allSubscribers,
    getBasicCreatorInfo,
    basicCreatorInfo,
  } = context;

  useEffect(() => {
    getBasicCreatorInfo(creatorID).then(() => {});
    getAllSubscribers();
  }, []);

  //EMail Sending API Context

  const getUserMails = async () => {
    const subsData = await getAllSubscribers();
    if (subsData.length !== 0) {
      let users = [];
      for (let index = 0; index < subsData.length; index++) {
        let email = subsData[index]?.userID?.email
          ? subsData[index]?.userID?.email
          : "";
        users.push(email);
      }
      return users;
    }
    return null;
  };

  
  const [sending, setsending] = useState(false);

  const [Subject, setSubject] = useState(
    `Message from ${basicCreatorInfo?.name}`
  );
  const [Content, setContent] =
    useState(`This is your friend ${basicCreatorInfo?.name} and I hope you enjoyed all the resources over Anchors.<br>Recently I uploaded one more resource on <b>\"${serviceName}\"</b>.I think you gonna love this and find it helpful.<br>So what are you waiting for Check here...`);

  const sendMail = async (userMails) => {
    const res = await fetch(
      "https://6ht3n8kja3.execute-api.ap-south-1.amazonaws.com/Stage1/sendEmail",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorName: basicCreatorInfo?.name.toLowerCase(),
          receiverEmail: userMails,
          message: Content,
          subject: Subject,
          link: serviceCopyURL ? `https://www.anchors.in/r/${serviceCopyURL}` : `https://www.anchors.in/s/${serviceSlug}`,
          banner_link: serviceBanner
        }),
      }
    );
    console.log(res);
  };

  const data = [
    "guillermo.collins@yahoo.com",
    "loma23@lowe.com",
    "abdullah01@damore.biz",
    "homenick.alivia@yahoo.com",
    "odell.raynor@gmail.com",
    "eldon.corkery@hotmail.com",
    "jamar98@hotmail.com",
    "vincenzo06@gmail.com",
    "iliana.mcdermott@gmail.com",
    "raven.champlin@yahoo.com",
    "rosenbaum.rebekah@okon.com",
    "zdickinson@hotmail.com",
    "reanna.hansen@hotmail.com",
    "rippin.king@murazik.net",
    "ora41@bode.info",
    "whitney76@wisoky.net",
    "rajpootyuvraj02@gmail.com",
    "icie71@hotmail.com",
    "julie.bauch@hand.com",
    "fahey.erna@hotmail.com",
    "justus84@hotmail.com",
    "bmills@gmail.com",
    "gutmann.helene@white.com",
    "keon31@kilback.com",
    "emery08@prosacco.org",
    "drew31@murazik.com",
    "schroeder.jeffrey@gmail.com",
    "hbraun@hotmail.com",
    "aankunding@yahoo.com",
    "ara.hudson@gmail.com",
    "lrippin@batz.com",
    "lemke.krista@gleason.com",
    "emmett52@mclaughlin.org",
    "rosetta91@mcdermott.net",
    "ybnightlight4869@gmail.com",
    "mathilde62@gmail.com",
    "rwalker@yahoo.com",
    "choppe@hotmail.com",
    "zberge@quitzon.net",
    "kristy65@yahoo.com",
    "ggibson@fisher.com",
    "bergnaum.cornelius@yahoo.com",
    "spfannerstill@osinski.net",
    "ursula.toy@sipes.com",
    "freda.lueilwitz@schuppe.com",
    "weldon.carroll@bins.com",
    "demarco.fisher@hotmail.com",
    "harry35@wiegand.com",
    "titus68@gmail.com",
    "kblock@gmail.com",
    "rolando48@kihn.net",
    "libbie07@braun.com",
    "hubert30@gmail.com",
    "allie.fay@hotmail.com",
    "marianna.greenholt@kulas.com",
    "cooper83@jast.com",
    "carmela.murazik@schumm.org",
    "hills.jonathon@yahoo.com",
    "rau.berry@mayer.com",
    "odell60@yahoo.com",
    "julien.kling@schoen.com",
    "iliana35@hotmail.com",
    "bins.mathias@kub.com",
    "rico28@langosh.info",
    "mritchie@okeefe.biz",
    "yoyouv2002@gmail.com",
    "betty52@gmail.com",
    "emilio.reinger@hotmail.com",
    "camren.kozey@gmail.com",
    "grant.dayne@hotmail.com",
    "pmarks@gmail.com",
    "neva.muller@schuppe.com",
    "dee.pagac@balistreri.com",
    "elmira.bogan@gmail.com",
    "tyshawn.mertz@eichmann.com",
    "lueilwitz.ola@beer.biz",
    "leannon.jaquan@yahoo.com",
    "ngrant@hotmail.com",
    "kschroeder@walker.net",
    "anderson.fredy@yahoo.com",
    "adella.daniel@hotmail.com",
    "claudia.heathcote@fisher.com",
    "olga.leffler@gmail.com",
    "zula.welch@gulgowski.com",
    "katrine.ondricka@gmail.com",
    "ldach@yahoo.com",
    "haley79@eichmann.com",
    "hgoodwin@hotmail.com",
    "rlindgren@roberts.biz",
    "halvorson.mack@yahoo.com",
    "dhartmann@bauch.com",
    "jerde.nella@yahoo.com",
    "turner.raheem@gmail.com",
    "archibald59@franecki.com",
    "karley.dicki@hotmail.com",
    "buckridge.horace@hintz.com",
    "uwilkinson@waters.com",
    "klein.etha@hotmail.com",
    "margie70@mccullough.org",
    "madaline.bartell@hotmail.com",
    "jaydon36@hotmail.com",
    "prohaska.dewayne@yahoo.com",
    "sconroy@hotmail.com",
    "nhand@yahoo.com",
    "billy72@yahoo.com",
    "torp.katelyn@hotmail.com",
    "fritsch.una@gmail.com",
    "delpha19@hotmail.com",
    "pearline.nitzsche@yahoo.com",
    "cstiedemann@gmail.com",
    "sam.gusikowski@gmail.com",
    "wilber.goodwin@kris.com",
    "rath.nellie@yahoo.com",
    "tyrese80@gmail.com",
    "hank.sauer@yahoo.com",
    "nader.jazmyne@grady.com",
    "vschaefer@yahoo.com",
    "ljohns@gmail.com",
    "petra.veum@muller.net",
    "lesly61@gmail.com",
    "alexzander53@okon.com",
    "silas.gibson@gmail.com",
    "dicki.rylee@yahoo.com",
    "keebler.columbus@gmail.com",
    "bconroy@kautzer.com",
    "aimee.friesen@marks.info",
    "cortez29@bayer.com",
    "mharber@bartoletti.com",
    "abechtelar@leannon.com",
    "prohaska.davonte@wiegand.org",
    "acormier@yahoo.com",
    "mercedes87@gmail.com",
    "sschinner@mueller.net",
    "merle.roob@morar.org",
    "aprice@fisher.com",
    "nwunsch@simonis.biz",
    "umarquardt@hotmail.com",
    "harry.fay@hotmail.com",
    "solon.graham@dicki.com",
    "verona46@hotmail.com",
    "gabriel78@yahoo.com",
    "nnikolaus@swaniawski.com",
    "laney53@yahoo.com",
    "darren85@hotmail.com",
    "mary94@oberbrunner.org",
    "akling@gmail.com",
    "schamberger.andres@yahoo.com",
    "marquise57@mitchell.net",
    "welch.carlo@gmail.com",
    "kristy63@hotmail.com",
    "vsimonis@gutkowski.biz",
    "showell@swaniawski.com",
    "bins.mabelle@bode.com",
    "paucek.logan@parisian.com",
    "gkrajcik@kovacek.com",
    "gardner.vandervort@leannon.info",
    "pcrist@gmail.com",
    "alycia.gulgowski@paucek.com",
    "llebsack@dach.com",
    "jweber@dach.com",
    "stephanie.keebler@nitzsche.com",
    "bergnaum.marco@hotmail.com",
    "lavonne91@kshlerin.com",
    "schimmel.brain@stehr.com",
    "boehm.rosemarie@mohr.com",
    "ralph.bernhard@johns.net",
    "georgette.mills@hotmail.com",
    "kunde.zora@hotmail.com",
    "sabbott@hotmail.com",
    "schaden.jaunita@hotmail.com",
    "dibbert.joelle@gmail.com",
    "carroll.chelsie@strosin.info",
    "kuhic.wilburn@gmail.com",
    "lorna34@prosacco.com",
    "grant.jedediah@hotmail.com",
    "xgottlieb@yahoo.com",
    "osinski.macy@schmidt.com",
    "nvolkman@yahoo.com",
    "singhyuvraj0506@gmail.com",
  ];


  const data2 = [
    "ybnightlight4869@gmail.com",
    "singhyuvraj0506@gmail.com",
    "raviahirwar660@gmail.com"
  ]

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    progress(0);
    setsending(true);
    //mixpanel.track("Email Sent to Subscribers", {
    //    serviceName: "The Service Name",
    //    creatorName: "CreatorName"
    //})
    //const userMails = await getUserMails();
    const userMails = data;
    const items = 14; // no of items allowed by ses to email
    if (userMails) {
      const temp = [];
      const numberOfMails =
        userMails?.length % items === 0
          ? parseInt(userMails?.length / items)
          : parseInt(userMails?.length / items) + 1;
      for (let i = 0; i < numberOfMails; i++) {
        temp.push(userMails.slice(items * i, items * i + items));
      }

      for (let index = 0; index < temp.length; index++) {
        setTimeout(async () => {
          await sendMail(temp[index]);
        }, 1000);
      }
      toast.success("Email Sent Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      onClose();
    } else {
      console.log("No Subscribers");
    }
    progress(100);
    setsending(false);
    //setsent(true)
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="model">
        <div
          onClick={(e) => e.stopPropagation()}
          className="model_main_box email_box"
        >
          <span className="model_question">Send Email to Subscriber</span>

          <form noValidate autoComplete="off" className="email_form">
            <div>
              <label htmlFor="subjectEmail" className="entry_labels">
                Subject
              </label>
              <input
                type="text"
                name="subjectEmail"
                id="subjectEmail"
                placeholder="Subject"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                value={Subject}
              />
            </div>
            <div>
              <label htmlFor="contentEmail" className="entry_labels">
                Mail Content
              </label>
              <div className="editorinemail">
                <ReactEditor
                  readOnly={false}
                  content={Content}
                  setContent={setContent}
                />
              </div>
            </div>
          </form>
          <p className="email_subs">
            The Email will be send to {allSubscribers?.length} users
          </p>

          <div>
            <button
              className="model_button email_button"
              onClick={handleSubmitEmail}
            >
              {sending ? <>Sending</>:<>Send Email</>}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export const Email_Model1 = Email_Model_One;
export const Email_Model2 = Email_Model_Two;
