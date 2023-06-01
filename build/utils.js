const setBuildPath = function (buildPath) {
  if (buildPath) {
    return buildPath + 'js/[name].[chunkhash].bundle.js'
  } else return 'js/[name].[chunkhash].bundle.js'
}

module.exports = {
  setBuildPath
}
