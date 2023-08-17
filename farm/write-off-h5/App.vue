<script>
import Vue from "vue";

import detectUpdateManager from '@/frame/extend/update-manager'

export default Vue.extend({
  mpType: "app",
  onLaunch() {
		this.$store.dispatch('user/getUserData')
    detectUpdateManager()
  },
})
</script>

<style lang="scss"> 
@import url('@/frame/styles/common.scss');
</style>