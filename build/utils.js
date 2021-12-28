const setBuildPath = function (buildPath) {
  if (buildPath) {
    return buildPath + '/js/[name].[contenthash].bundle.js'
  } else return 'js/[name].[contenthash].bundle.js'
}

module.exports = {
  setBuildPath
}
