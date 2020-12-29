const aliases = (prefix = `src`) => ({
  '@routes': `${prefix}/constants/routes`,
  '@components': `${prefix}/components`,
  '@constants': `${prefix}/constants`,
  '@actions': `${prefix}/store/actions`,
  '@reducers': `${prefix}/store/reducers`,
  '@actionTypes': `${prefix}/store/actions/actionTypes`,
  '@utils': `${prefix}/utils`,
  '@assets': `${prefix}/assets`,
  '@UI': `${prefix}/components/UI`,
  '@hoc': `${prefix}/hoc`,
  '@axios': `${prefix}/axios`,
});

module.exports = aliases;
