/**
 * Plugin PostCSS que substitui a propriedade deprecated "color-adjust"
 * por "print-color-adjust" antes do Autoprefixer processar o CSS.
 * Elimina o warning: "Replace color-adjust to print-color-adjust"
 */
function replaceColorAdjustPlugin() {
  return {
    postcssPlugin: 'replace-color-adjust',
    Once(root) {
      root.walkDecls('color-adjust', (decl) => {
        decl.prop = 'print-color-adjust';
      });
    },
  };
}
replaceColorAdjustPlugin.postcss = true;

function prependPostCssPlugin(webpackConfig) {
  const oneOf = webpackConfig.module.rules.find((r) => r.oneOf)?.oneOf;
  if (!oneOf) return;
  oneOf.forEach((rule) => {
    if (!rule.use || !Array.isArray(rule.use)) return;
    rule.use.forEach((use) => {
      const loader = use.loader || use;
      if (String(loader).includes('postcss-loader') && use.options?.postcssOptions?.plugins) {
        const plugins = use.options.postcssOptions.plugins;
        use.options.postcssOptions.plugins = [replaceColorAdjustPlugin].concat(plugins);
      }
    });
  });
}

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 1) Excluir rsuite do source-map-loader: o pacote referencia
      // index.css.map que não existe no npm, gerando warning ENOENT.
      const sourceMapRule = webpackConfig.module.rules.find(
        (r) =>
          r.enforce === 'pre' &&
          r.loader &&
          String(r.loader).includes('source-map-loader')
      );
      if (sourceMapRule) {
        sourceMapRule.exclude = [/@babel(?:\/|\\{1,2})runtime/, /node_modules[\\/]rsuite/];
      }
      // 2) Injetar plugin PostCSS que substitui color-adjust por print-color-adjust.
      prependPostCssPlugin(webpackConfig);
      return webpackConfig;
    },
  },
};
