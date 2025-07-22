const websiteDescriptions = {
    star_descriptions : {
        B_Star_Description: {
            'Base_Description': 'B-type stars are hot, massive, and blue-white in color, with surface temperatures ranging from about 10,000 to 30,000 K. They burn their fuel quickly and emit strong ultraviolet radiation, often driving powerful stellar winds.',
            'Notable_Stars': 'Rigel, Spica, and Alnitak'
        },
        A_Star_Description: {
            'Base_Description': 'A-type stars are white or bluish-white stars with surface temperatures between about 7,500 and 10,000 K. They are typically larger and more luminous than the Sun, with strong hydrogen absorption lines in their spectra.',
            'Notable_Stars': 'Sirius A, Vega, and Altair'
        },
        F_Star_Description: {
            'Base_Description': 'F-type stars are yellow-white stars with surface temperatures between about 6,000 and 7,500 K. They are slightly hotter and more massive than the Sun, often showing both hydrogen and metallic absorption lines in their spectra.',
            'Notable_Stars': 'Procyon A, Canopus, and Polaris'
        },
        K_Star_Description: {
            'Base_Description': 'K-type stars are orange stars with surface temperatures between about 3,900 and 5,200 K. They are cooler and smaller than the Sun, known for their stability and long lifespans, making them strong candidates in the search for habitable exoplanets.',
            'Notable_Stars': 'Arcturus, Aldebaran, and Epsilon Eridani'
        },
        M_Star_Description: {
            'Base_Description': 'M-type stars are cool, red stars with surface temperatures below 3,900 K. They are the most common type of star in the universe, typically small and dim, with extremely long lifespans and frequent stellar flares.',
            'Notable_Stars': 'Proxima Centauri, Barnard’s Star, and Betelgeuse'
        },
        WD_Star_Description: {
            'Base_Description': 'White dwarfs (WDs) are dense, Earth-sized stellar remnants left behind after low- to intermediate-mass stars exhaust their fuel. They no longer undergo fusion and gradually cool over time, shining faintly from residual thermal energy.',
            'Notable_Stars': 'Sirius B, Procyon B, and 40 Eridani B'
        },
        L_Star_Description: {
            'Base_Description': 'L-type stars, or L dwarfs, are very cool, low-mass objects with surface temperatures between about 1,300 and 2,500 K. They are often classified as brown dwarfs and exhibit strong infrared emission with spectra dominated by metal hydrides and alkali metals.',
            'Notable_Stars': 'DENIS-P J0255.0-4700, 2MASS J1507-1627, and Gliese 229B.'
        },
        G_Star_Description: {
            'Base_Description': 'G-type stars are yellow stars with surface temperatures between about 5,200 and 6,000 K. They are moderately sized and include our Sun, producing steady light through hydrogen fusion and often hosting planetary systems.',
            'Notable_Stars': 'The Sun, Alpha Centauri A, and Tau Ceti'
        },
    },
    stellar_properties_dictionary : {
        'ELODIE_TEFF': 'Estimated effective temperature of the star.',
        'ELODIE_LOGG': 'Logarithmic surface gravity of the star.',
        'ELODIE_FEH': 'Metallicity ([Fe/H]) relative to the Sun.',
        'Z': 'Redshift of the object.',
        'Z_ERR': 'Error estimate for the redshift.',
        'ZWARNING': 'Flags indicating potential redshift fitting issues.',
        'VDISP': 'Stellar velocity dispersion (km/s).',
        'VDISP_ERR': 'Uncertainty in velocity dispersion.',
        'SN_MEDIAN_ALL': 'Median signal-to-noise ratio across all wavelengths.',
        'RCHI2': 'Reduced chi-squared from the spectral model fit.',
        'DOF': 'Degrees of freedom in the model fit.',
        'SNR_BinHigh_Quality': 'Signal-to-noise quality indicator for a specific wavelength bin.',
        'Mean_Flux': 'Average flux value across the spectrum.',
        'Flux_to_Noise': 'Ratio of mean flux to noise level.',
        'u_flux': 'Integrated flux in the SDSS u-band.',
        'g_flux': 'Integrated flux in the g-band.',
        'r_flux': 'Integrated flux in the r-band.',
        'i_flux': 'Integrated flux in the i-band.',
        'z_flux': 'Integrated flux in the z-band.',
        'flux_mean': 'Mean of the interpolated flux array.',
        'flux_std': 'Standard deviation of the interpolated flux.',
        'flux_min': 'Minimum flux value.',
        'flux_max': 'Maximum flux value.',
        'flux_median': 'Median of the flux values.',
        'flux_p25': '25th percentile (lower quartile) of the flux.',
        'flux_p75': '75th percentile (upper quartile) of the flux.'
    }
}
export default websiteDescriptions;