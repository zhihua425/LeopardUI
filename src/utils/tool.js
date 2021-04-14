const Tool = {
    methods: {
        getImgUrl(url) {
            return require("@/assets/img/" + url + ".png")
        },
        getImgUrlSvg(url){
            return require("@/assets/img/" + url+ ".svg")
        },
        toSwagger(){
            window.location.href = window.location.origin + "/swagger"
        }
        
    },
}

export default Tool;


