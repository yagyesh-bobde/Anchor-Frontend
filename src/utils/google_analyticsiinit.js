import ReactGA from "react-ga"

const googleAnalyticsAction = async() =>{
    ReactGA.initialize("G-LCHM48D5F0")
    ReactGA.pageview(window.location.pathname + window.location.search)
}

export default googleAnalyticsAction;