<!-- 中间收齐 -->
<template>
    <div
        class="we-bg-white container"
        :class="{'we-padding-bottom-10': !showBtn}"
    >
        <div
            :id="reId"
            class="content"
            :style="{'hight': (!show ?'auto':'')}"
            :class="{'we-line-1': startLength == 1 && show, 'we-line-2': startLength == 2 && show, 'we-line-3': startLength == 3 && show, 'we-line-4': startLength == 4 && show, 'we-line-5': startLength == 5 && show, 'we-line-6': startLength == 6 && show }"
            ref="bbo"
        >
            <slot></slot>
        </div>

        <div
            @click="isUnfold"
            class="img-wrapper"
            v-if="showBtn"
        >
            <img
                :src="show?srcDown:srcUp"
                alt
            >
            <span>{{show? downWord : upWord}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'extractEllipsis',
    props: {
        id: {
            type: String,
            default: 'extractEllipsis', 
            required: true
        },
        startLength: { //起始行数 1-6
            type: [Number, String],
            default: 3
        },
        lingHeight: {
            type: [Number, String],
            default: 15
        },
        upWord: {
            type: String,
            default: '收起'
        },
        downWord: {
            type: String,
            default: '展开'
        }
    },
    data() {
        return {
            srcDown: require('@img/icon_down1_blue.png'),
            srcUp: require('@img/icon_up1_blue.png'),
            show: true, //是否展开
            showBtn: true, //是否显示展开与收起按钮
            count: 1,
        }
    },
    computed: {
        // 重置id名称
        reId() {
            return 'ellipsis' + this.id
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getElementHeight()
        })
    },
    methods: {
        // 收起和展开切换
        isUnfold() {
            this.show = !this.show
            this.getElementHeight()
        },

        // 获取盒子高度
        getElementHeight() {
            this.GetElement('#' + this.reId)
            .then(res => {
                let height = res.height
                if(height < this.lingHeight * this.startLength) this.showBtn = false
            }) 
        }
    }
}
</script>

<style lang="scss" scoped>
@import './extractEllipsis.scss';
</style>