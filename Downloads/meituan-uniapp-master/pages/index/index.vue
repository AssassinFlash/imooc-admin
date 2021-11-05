<template>
  <view>
    <Search></Search>
    <Preference :preferData="preferData"></Preference>
    <Nearby></Nearby>
    <Delicacy></Delicacy>
    <Takeout></Takeout>
  </view>
</template>

<script>
import Search from "./components/search.vue";
import Preference from "./components/preference.vue";
import Nearby from "./components/nearby.vue";
import Delicacy from "./components/delicacy.vue";
import Takeout from "./components/takeout.vue";
export default {
  components: {
    Search,
    Preference,
    Nearby,
    Delicacy,
    Takeout,
  },
  data() {
    return {
      title: "Hello",
      preferData: [], // 为你优选
    };
  },
  onLoad() {
    this.preference();
  },
  methods: {
    preference() {
      uni
        .request({
          url: "https://meituan.thexxdd.cn/api/forshop/getprefer",
          method: "GET",
        })
        .then((res) => {
          this.preferData = res[1].data;
        });
    },
  },
};
</script>

<style></style>
