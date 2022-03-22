export default {
    data() {
        return { isMobile: false };
    },
    created() {
        this.updateIsMobile();
        window.addEventListener("resize", this.updateIsMobile);
    },
    methods: {
        updateIsMobile() {
            this.isMobile = window.innerWidth <= 750;
        }
    }
}