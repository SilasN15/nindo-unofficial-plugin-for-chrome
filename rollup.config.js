import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/**/*.js',
  output: {
    dir: '.',
    format: 'cjs',
  },
  plugins: [commonjs({ extensions: ['.js'] })],
};
