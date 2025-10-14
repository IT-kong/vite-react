Docker 是一个开源的容器化平台，让开发者可以打包应用及其依赖到一个可移植的容器中，实现跨环境的一致性运行。以下是 Docker 最常用的基础操作，帮助你快速上手：

### **一、Docker 环境验证**

首先确认 Docker 已正确安装并运行：

```bash
# 查看 Docker 版本
docker --version

# 验证 Docker 服务是否正常运行（会启动一个测试容器）
docker run hello-world
```

如果看到 "Hello from Docker!" 提示，说明环境正常。

### **二、镜像（Image）操作**

镜像是容器的"模板"，包含运行应用所需的代码、环境、依赖等。

#### 1. 拉取镜像（从仓库下载）

```bash
# 拉取官方镜像（格式：docker pull [镜像名]:[标签]，标签默认latest）
docker pull ubuntu:22.04  # 拉取 Ubuntu 22.04 镜像
docker pull nginx         # 拉取最新版 Nginx 镜像
docker pull mysql:8.0     # 拉取 MySQL 8.0 镜像
```

#### 2. 查看本地镜像

```bash
# 列出所有本地镜像
docker images

# 过滤查看特定镜像
docker images nginx  # 只显示 nginx 相关镜像
```

#### 3. 删除镜像

```bash
# 删除指定镜像（需先停止并删除依赖该镜像的容器）
docker rmi 镜像ID/镜像名:标签

# 强制删除（即使有容器依赖）
docker rmi -f 镜像ID
```

#### 4. 保存/加载镜像（用于迁移）

```bash
# 将镜像保存为本地文件（.tar）
docker save -o 文件名.tar 镜像名:标签

# 从本地文件加载镜像
docker load -i 文件名.tar
```

### **三、容器（Container）操作**

容器是镜像的运行实例，一个镜像可以创建多个容器。

#### 1. 创建并启动容器

```bash
# 基础格式：docker run [参数] 镜像名 [命令]
# 示例1：启动一个交互式 Ubuntu 容器（-it 表示交互式终端）
docker run -it --name my-ubuntu ubuntu:22.04 /bin/bash

# 示例2：启动一个后台运行的 Nginx 容器（-d 表示后台运行，-p 端口映射）
docker run -d --name my-nginx -p 8080:80 nginx
# 此时访问 http://localhost:8080 可看到 Nginx 默认页面
```

**常用参数说明**：

- `-i`：保持标准输入打开
- `-t`：分配一个伪终端（通常与 `-i` 一起用 `-it`）
- `-d`：后台运行容器
- `--name`：指定容器名称（不指定则随机生成）
- `-p 主机端口:容器端口`：将主机端口映射到容器端口（如 `-p 8080:80`）
- `-v 主机目录:容器目录`：挂载主机目录到容器（实现文件共享），如：
  ```bash
  docker run -d -v /home/user/data:/app/data --name my-app my-image
  ```

#### 2. 查看容器状态

```bash
# 列出正在运行的容器
docker ps

# 列出所有容器（包括停止的）
docker ps -a
```

#### 3. 启动/停止/重启容器

```bash
# 启动已停止的容器
docker start 容器ID/容器名

# 停止运行中的容器
docker stop 容器ID/容器名

# 强制停止容器
docker kill 容器ID/容器名

# 重启容器
docker restart 容器ID/容器名
```

#### 4. 进入运行中的容器

```bash
# 进入容器并打开终端（适用于后台运行的容器）
docker exec -it 容器ID/容器名 /bin/bash
# 退出容器终端：按 Ctrl+D 或输入 exit
```

#### 5. 查看容器日志

```bash
# 查看容器实时日志（-f 表示实时跟踪）
docker logs -f 容器ID/容器名

# 查看最后100行日志
docker logs --tail 100 容器ID
```

#### 6. 删除容器

```bash
# 删除已停止的容器
docker rm 容器ID/容器名

# 强制删除运行中的容器
docker rm -f 容器ID/容器名

# 删除所有停止的容器
docker container prune
```

### **四、其他实用操作**

#### 1. 查看容器详细信息

```bash
docker inspect 容器ID/容器名  # 查看容器的IP、挂载、配置等详细信息
```

#### 2. 查看容器资源使用情况

```bash
docker stats  # 实时显示所有容器的CPU、内存使用情况
```

#### 3. 容器与主机文件传输

```bash
# 从主机复制文件到容器
docker cp 主机文件路径 容器ID:容器内路径

# 从容器复制文件到主机
docker cp 容器ID:容器内文件路径 主机路径
```

#### 4. 登录 Docker 仓库（如 Docker Hub）

```bash
docker login  # 输入用户名和密码登录
docker logout  # 退出登录
```

#### 5. 推送镜像到仓库（需先登录）

```bash
# 先给镜像打标签（格式：仓库地址/用户名/镜像名:标签）
docker tag 本地镜像名:标签 用户名/镜像名:标签

# 推送镜像
docker push 用户名/镜像名:标签
```

### **常用命令速查表**

| 操作目标 | 命令示例                                     |
| -------- | -------------------------------------------- |
| 镜像拉取 | `docker pull 镜像名`                         |
| 镜像列表 | `docker images`                              |
| 删除镜像 | `docker rmi 镜像ID`                          |
| 启动容器 | `docker run -d --name 容器名 -p 端口 镜像名` |
| 容器列表 | `docker ps [-a]`                             |
| 停止容器 | `docker stop 容器名`                         |
| 进入容器 | `docker exec -it 容器名 bash`                |
| 删除容器 | `docker rm 容器名`                           |
| 查看日志 | `docker logs -f 容器名`                      |

通过这些基础操作，你可以完成 Docker 镜像和容器的日常管理。熟练后可进一步学习 Docker Compose（多容器编排）、Dockerfile（自定义镜像）等进阶内容。
