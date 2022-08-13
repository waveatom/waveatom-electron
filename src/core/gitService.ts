

import path from 'path';
import fs from 'fs';
import { exec } from '../utils/index';


let committing = false;
let pulling = false;
class GitOperator {
  public addGitRepoForDirectory() {

  }

  public async getGitAddress(dir: string) {
    const p = path.resolve(dir);
    if (!fs.existsSync(p)) return 'path is not exist!';
    await exec(`cd ${p}`);

    const res = await exec(`git -C "${p}" remote -v`);
    return res.message.match(/https?:\/\/\S+/)[0];
  }

  public async addGitRepoForDir(dir: string, repo: { url: string, userName: string, password: string }) {
    const p = path.resolve(dir);
    if (!fs.existsSync(p)) {
      return 'path is not exist!';
    }

    await exec(`git  -C "${p}" init`);

    const res = await exec(`git  -C "${p}" remote add origin ${repo.url}`);

    return res
  }

  public async gitPull(dir) {
    if (pulling) return;
    pulling = true;
    try {
        const p = path.resolve(dir);
        const pullRes = await exec(`git -C "${p}" pull  origin master`);
        if (!pullRes) {
            return false;
        }
    } finally {
        pulling = false;
    }
    return true;
  }

  public async commitAndPush(dir: string) {
    if (committing) return;
    committing = true;

    await this.gitPull(dir)
    try {
        const p = path.resolve(dir);
        const addRes = await exec(`git -C "${p}" add .`);
        if (!addRes) {
            return false;
        }
        const commitRes = await exec(`git -C "${p}" commit -m '测试笔记软件的提交'`);
        if (!commitRes) {
            return false;
        }
        const pushRes = await exec(`git -C "${p}" push --set-upstream origin master`);
        
        if (!pushRes) {
            return false;
        }
        return true;
    } finally {

        committing = false;
        console.log(112123123213);
        process.exit(-1)
        return true;

    }
  }
}



export default new GitOperator()