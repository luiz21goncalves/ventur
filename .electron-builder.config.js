/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: "Ventur",
  appId: "com.luizgoncaves.ventur",
  artifactName: "${productName}-${os}-${arch}-${version}.${ext}",
  asar: true,
  directories: {
    output: "release/${version}",
    buildResources: "assets",
  },
  files: ["dist"],
  win: {
    target: [
      {
        target: "nsis",
        arch: "ia32",
      },
    ],
  },
  linux: {
    target: ["deb"],
  },
  publish: {
    provider: "github",
    owner: "luiz21goncalves",
    repo: "ventur"
  }
}
