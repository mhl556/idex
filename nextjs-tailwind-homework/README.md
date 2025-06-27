
-   **`QAnything/`**: 作为一个独立的服务模块。这种方式便于独立维护和部署 QAnything，主应用通过 API 与其通信。
-   **`my-wakatime-worker/`**: 一个独立的 Cloudflare Worker 服务，作为代理安全地从服务端获取 WakaTime 数据，避免在前端暴露 API 密钥。
-   **`src/app/`**: Next.js 应用的核心代码，负责前端渲染和业务逻辑。

## 3. QAnything 集成路径与实现细节

### 集成路径

-   **路径选择**: `nextjs-tailwind-homework/QAnything/`
-   **选择原因**: 将 `QAnything` 作为一个独立的子目录（或 Git Submodule）集成到主项目中。这样做的好处是：
    1.  **解耦**：`QAnything` 自身是一个完整的项目，将其作为独立模块可以与主应用解耦，便于分别进行开发、测试和升级。
    2.  **便于部署**：`QAnything` 依赖 Docker 环境，可以根据其自身的 `docker-compose.yaml` 文件独立运行，不影响主应用的部署流程。

### 实现细节

1.  **启动 QAnything 服务**: 根据 `QAnything` 目录下的官方文档，使用 Docker Compose 启动其后端服务。
    ```bash
    # 进入 QAnything 目录
    cd QAnything
    # 根据你的操作系统选择对应的 docker-compose 文件启动
    docker-compose -f docker-compose-linux.yaml up -d
    ```
2.  **API 通信**: Next.js 应用通过 HTTP 请求调用 `QAnything` 暴露的 API 接口（例如 `http://localhost:8777/api/local_doc_qa/...`）来实现知识库问答功能。

## 4. WakaTime API 集成方法

### 集成方式

为了保护 WakaTime API Key 不在前端泄露，我们采用 Cloudflare Worker 作为中间层代理。

-   **代码位置**: `my-wakatime-worker/`
-   **实现逻辑**: 
    1.  在 Cloudflare 创建一个 Worker。
    2.  将 WakaTime API Key 作为环境变量安全地存储在 Worker 的设置中。
    3.  Worker 接收到前端请求后，在服务端使用 API Key 向 WakaTime 官方 API (`https://wakatime.com/api/v1/...`) 发起请求。
    4.  Worker 将获取到的数据处理后返回给 Next.js 前端。

### 实现细节

1.  **部署 Worker**:
    ```bash
    # 进入 worker 目录
    cd my-wakatime-worker
    # 部署到 Cloudflare
    npx wrangler deploy
    ```
2.  **前端调用**: 在 Next.js 页面中，使用 `fetch` 或 `axios` 调用已部署的 Worker URL 来获取编程统计数据。

## 5. 项目运行指南

请确保已安装 [Node.js](https://nodejs.org/) 和 [Docker](https://www.docker.com/)。

1.  **克隆项目**:
    ```bash
    git clone <your-repository-url>
    cd nextjs-tailwind-homework
    ```

2.  **安装依赖**:
    ```bash
    npm install
    ```

3.  **配置环境变量**:
    -   在项目根目录创建 `.env.local` 文件。
    -   添加指向 QAnything 服务和 WakaTime Worker 的 URL：
        ```
        NEXT_PUBLIC_QANYTHING_API_URL=http://localhost:8777
        NEXT_PUBLIC_WAKATIME_WORKER_URL=<your-wakatime-worker-url>
        ```

4.  **启动 QAnything 服务**:
    ```bash
    cd QAnything
    # 根据你的系统选择并启动
    docker-compose -f docker-compose-win.yaml up -d
    cd ..
    ```

5.  **部署 WakaTime Worker** (如果还未部署):
    ```bash
    cd my-wakatime-worker
    npx wrangler deploy
    cd ..
    ```

6.  **启动 Next.js 开发服务器**:
    ```bash
    npm run dev
    ```

现在，在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可查看项目运行结果。