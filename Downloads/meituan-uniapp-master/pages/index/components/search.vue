<template>
	<view>
		<!-- 定位 -->
		<view class="search-view">
			<image src="../../../static/coen/dingwei.svg" mode="widthFix"></image>
			<text class="search-text">阿里巴巴淘宝城2期西溪园区</text>
		</view>
		<!-- 搜索 -->
		<view class="search-cont">
			<view class="search">
				<u-search
					placeholder="麻辣烫"
					disabled
					:show-action="false"
					@click="toSearch()"
				></u-search>
			</view>
		</view>
		<!-- 自定义轮播 -->
		<view class="swiper-view">
			<swiper
				class="swiper"
				:autoplay="false"
				:interval="2000"
				:duration="1000"
				@change="handleSwiperChange($event)"
			>
				<swiper-item v-for="(item, index) in lable" :key="index">
					<view class="swiper-item">
						<view class="content-img" v-for="(data, i) in item" :key="i">
							<image :src="data.img" mode="widthFix" />
							<text>{{ data.title }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- 指示点 -->
			<view class="instruct-view">
				<view
					class="instruct"
					:class="{ active: currentIndex === index }"
					v-for="(item, index) in instructData"
					:key="index"
				></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播数组
			lable: [
				[
					{
						img: '../../../static/inster/meishi.png',
						title: '美食',
					},
					{
						img: '../../../static/inster/chaoshi.png',
						title: '超市便利',
					},
					{
						img: '../../../static/inster/shuiguo.png',
						title: '蔬菜水果',
					},
					{
						img: '../../../static/inster/meituan.png',
						title: '美团专送',
					},
					{
						img: '../../../static/inster/paotui.png',
						title: '跑腿代购',
					},
					{
						img: '../../../static/inster/yexiao.png',
						title: '夜宵',
					},
					{
						img: '../../../static/inster/jintie.png',
						title: '津贴联盟',
					},
					{
						img: '../../../static/inster/pinping.png',
						title: '甜点饮品',
					},
					{
						img: '../../../static/inster/shaokao.png',
						title: '龙虾烧烤',
					},
					{
						img: '../../../static/inster/dangao.png',
						title: '甜蜜蛋糕',
					},
				],
				[
					{
						img: '../../../static/inster/hanbao.png',
						title: '汉堡披萨',
					},
					{
						img: '../../../static/inster/liaoli.png',
						title: '日韩料理',
					},
					{
						img: '../../../static/inster/malatang.png',
						title: '麻辣烫',
					},
					{
						img: '../../../static/inster/kuaican.png',
						title: '快食简餐',
					},
					{
						img: '../../../static/inster/xianhua.png',
						title: '浪漫鲜花',
					},
					{
						img: '../../../static/inster/lazi.png',
						title: '无辣不欢',
					},
					{
						img: '../../../static/inster/jiaozi.png',
						title: '饺子馆',
					},
					{
						img: '../../../static/inster/xiaochi.png',
						title: '小吃馆',
					},
					{
						img: '../../../static/inster/baofan.png',
						title: '煲仔饭',
					},
					{
						img: '../../../static/inster/qita.png',
						title: '其他',
					},
				],
			],
			// 面板指示点
			instructData: ['', ''],
			// 当前面板指示点
			currentIndex: 0,
		}
	},
	methods: {
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search',
			})
		},
		handleSwiperChange(event) {
			this.currentIndex = event.detail.current
		},
	},
}
</script>

<style lang="scss" scoped>
// 定位
.search-view {
	height: 80rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-weight: bold;

	image {
		width: 35rpx;
		height: 100%;
	}

	.search-text {
		padding: 0 10rpx;
	}
}
// 搜索
.search-cont {
	height: 70rpx;
	padding: 0 10rpx;
	display: flex;
	align-items: center;

	.search {
		height: 100%;
		width: 100%;
	}
}
// 轮播
swiper {
	height: 320rpx !important;

	.swiper-item {
		height: 320rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.content-img {
			width: calc((100% / 5) - 24rpx) !important;
			margin: 12rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 35rpx;
				margin-bottom: 10rpx;
			}

			text {
				font-size: 26rpx;
			}
		}
	}
}
// 指示点
.instruct-view {
	padding-top: 10rpx;
	display: flex;
	justify-content: center;

	.instruct {
		width: 50rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background: #e6e6e6;
		transition: all 0.3s ease;

		&:first-of-type {
			margin-right: 20rpx;
		}
	}
}
.active {
	background: #fbae22 !important;
}
</style>
