# XJTUANA 社团文档

- 主要架构
  - 构建工具：yarn
  - 框架：Gatsby
- 部署地址
  - [https://docs.xjtuana.com](https://docs.xjtuana.com)

## 开发指南

### 1. 安装相关依赖

```bash
yarn install
```

### 2. 修改文档文件

文档文件位于 `content/docs` 目录，使用 Markdown 格式书写。

### 3. 本地预览

```bash
yarn start
```

#### 4. 代码提交和更新等问题

- `main` 分支禁止直接 `push`，更新的代码要 `push` 到 `dev` 分支
- `dev` 分支稳定后发起 PR 合并到 `main` 分支
