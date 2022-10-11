# 蜜橙小说
# 包名：`com.coodong.novel`
# [蓝湖链接](https://lanhuapp.com/web/#/item/project/stage?tid=c77a787e-b1fb-42a1-ba8c-687a14a91110&pid=e35c7ac9-2864-48f1-87de-66231d27afda)

## 下列参数会被传给隐私政策网页，提审前需正确填写。

- [ ] `manifest.json` 中的 `name`
- [ ] `manifest.json` 中的 `companyName`
- [ ] hap://app/com.coodong.novel/redbox?pid=XXX

## `git submodule` 的使用
- 在项目根目录执行 `git submodule add git@github.com:halo2024/cmps.git src/cmps`
- 如果第一次是通过 `git clone` 下载的代码，则执行 `git submodule update --init --recursive`
- 后续拉取最新的 `submodule` 代码，则执行 `git submodule update --remote`