const Tool = {
    methods: {
        getImgUrl(url) {
            return require("@/assets/img/" + url + ".png")
        },
        getImgUrlSvg(url){
            return require("@/assets/img/" + url+ ".svg")
        }
        
    },
}

export default Tool;


