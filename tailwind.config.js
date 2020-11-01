module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['public/*.html', 'src/*.jsx'],
  theme: {
    extend: {
      colors: {
        /* water.css variables: https://github.com/kognise/water.css/blob/master/src/variables-light.css */
        background: {
          default: 'var(--background)',
          body: 'var(--background-body)',
          alt: 'var(--background-alt)',
          hover: 'var(--button-hover)',
        },
        selection: 'var(--selection)',
        main: 'var(--text-main)',
        bright: 'var(--text-bright)',
        muted: 'var(--text-muted)',
        links: 'var(--links)',
        focus: 'var(--focus)',
        form: {
          default: 'var(--form-text)',
          placeholder: 'var(--form-placeholder)',
        },
        border: {
          default: 'var(--border)',
        },
        code: 'var(--code)',
        variable: 'var(--variable)',
        highlight: 'var(--highlight)',

        /* bootstrap-ish */
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
      },
      screens: {
        day: { raw: '(prefers-color-scheme: light)' },
        night: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {},
  plugins: [require('tailwindcss-elevation')([], { color: 'var(--color-shadow)' })],
};
