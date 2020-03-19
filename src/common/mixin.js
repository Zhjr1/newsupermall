import {debounce} from './utils';

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mouted() {
        let refresh = debounce(this.$refs.scroll.refresh,100)

        this.itemImgListener = () => {
            refresh()
        }

        this.$bus.$on('itemImgLoad',this.itemImgListener);
        console.log('混入');
    }
}