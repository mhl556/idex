export default function Greeting({ name }) {
    return (
      <p>你好, <span v-pre>{{ name }}</span>! 欢迎来到 Next.js 的世界。</p>
    );
  }
