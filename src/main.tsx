import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// 注：本项目含大量视频自动播放与状态机交互，
// StrictMode 的开发期双重挂载会导致视频加载被中断（ERR_ABORTED）并造成首屏状态抖动，
// 因此这里不启用 StrictMode，生产构建不受影响。
createRoot(document.getElementById('root')!).render(<App />)
