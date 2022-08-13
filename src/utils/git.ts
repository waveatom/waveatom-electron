import path from "path";
import { noteCacheDirectory } from "./contants";
import fs from 'fs';
import gitService from "../core/gitService";

export async function addFileForGit(nodeInfo) {
  const name = nodeInfo.name || 'yueqi'
  if(!fs.existsSync(path.resolve(noteCacheDirectory))) {
    fs.mkdirSync(path.resolve(noteCacheDirectory))
  } 

  console.log('path', noteCacheDirectory)
  // 先将文件写入本地
  const markdownFileDir = path.resolve(noteCacheDirectory, `${name}.md`)
  const markdownMetaDir = path.resolve(noteCacheDirectory, `${name}.wm`)

  fs.writeFileSync(markdownFileDir, nodeInfo.content)
  fs.writeFileSync(markdownMetaDir, nodeInfo.meta)

  try {
    await gitService.addGitRepoForDir(noteCacheDirectory, nodeInfo.repo)
    await gitService.commitAndPush(noteCacheDirectory)
  }catch (e) {
    console.log(e)
  }
 
}
