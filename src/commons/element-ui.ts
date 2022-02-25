import { App } from 'vue'
import { ElButton, ElMessage } from 'element-plus'

export default {
  install (app: App):void {
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
    // app.config.globalProperties.$message = ElMessage;
    app.use(ElButton)
    app.use(ElMessage)
  }
}
