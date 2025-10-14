要实现通过WSL、Docker和GitLab构建"代码提交即自动部署"的CI/CD流程，需要整合这三个工具并配置自动化流水线。以下是详细实现步骤：

### **一、环境准备**

#### 1. 确保WSL已安装并配置好

如果还没配置WSL，请参考之前的WSL配置指南，建议使用Ubuntu发行版。

#### 2. 在WSL中安装Docker

```bash
# 更新包管理器
sudo apt update && sudo apt upgrade -y

# 安装Docker依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加Docker仓库
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 安装Docker
sudo apt update && sudo apt install -y docker-ce

# 将当前用户添加到docker组（避免每次使用sudo）
sudo usermod -aG docker $USER

# 启动Docker服务
sudo service docker start

# 设置Docker开机自启
sudo systemctl enable docker
```

**注意**：重启WSL使权限生效 `wsl --shutdown`

#### 3. 安装GitLab Runner

GitLab Runner是执行CI/CD任务的代理程序：

```bash
# 下载GitLab Runner
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash

# 安装GitLab Runner
sudo apt install -y gitlab-runner

# 启动并设置开机自启
sudo systemctl enable --now gitlab-runner
```

### **二、配置GitLab Runner**

1. 登录你的GitLab仓库（可以是自托管的GitLab或GitLab.com）
2. 进入项目 → **Settings** → **CI/CD** → **Runners**
3. 记录下`URL`和`Registration token`

4. 在WSL中注册Runner：

```bash
sudo gitlab-runner register

# 按照提示输入：
# 1. GitLab实例URL（如https://gitlab.com）
# 2. 项目的Registration token
# 3. 给Runner起个名字（如wsl-runner）
# 4. 添加标签（如wsl,docker）
# 5. 选择执行器（输入docker）
# 6. 设置默认Docker镜像（如alpine:latest）
```

5. 确认Runner已激活：在GitLab的Runner页面看到绿色的"活跃"状态

### **三、创建CI/CD配置文件**

在你的项目根目录创建`.gitlab-ci.yml`文件，定义自动化流程：

### **四、创建Dockerfile**

在项目根目录创建`Dockerfile`，定义应用的构建方式：

### **五、配置环境变量（可选）**

如果你的CI/CD流程需要敏感信息（如Docker仓库密码），可以在GitLab中配置环境变量：

1. 进入项目 → **Settings** → **CI/CD** → **Variables**
2. 点击"Add variable"添加变量（如`DOCKER_USERNAME`和`DOCKER_PASSWORD`）
3. 在`.gitlab-ci.yml`中通过`$变量名`引用

### **六、测试CI/CD流程**

1. 将以上配置文件添加到你的项目中
2. 提交代码到GitLab的`main`分支：
   ```bash
   git add .gitlab-ci.yml Dockerfile
   git commit -m "Add CI/CD configuration"
   git push origin main
   ```
3. 在GitLab项目页面 → **CI/CD** → **Pipelines** 查看流水线执行状态
4. 成功后，访问`http://localhost:8080`（或你配置的端口）查看部署的应用

### **七、优化建议**

1. **分支策略**：对开发分支只执行build和test，只有合并到main分支才执行deploy
2. **缓存依赖**：在`.gitlab-ci.yml`中添加缓存配置，加速构建
   ```yaml
   cache:
     paths:
       - node_modules/ # 缓存npm依赖
   ```
3. **部署策略**：对于生产环境，可使用蓝绿部署或金丝雀发布降低风险
4. **通知机制**：添加部署结果通知（如邮件、Slack）
5. **日志收集**：集成ELK栈或其他日志工具，方便排查问题

通过以上配置，你已经实现了在WSL环境中，利用GitLab和Docker构建"代码提交即自动部署"的CI/CD流水线。每次向main分支提交代码，都会自动触发构建、测试和部署的全过程。
