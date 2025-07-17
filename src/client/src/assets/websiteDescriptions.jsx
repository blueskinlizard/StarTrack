const star_descriptions = {
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
}

const stellar_properties_dictionary = {
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

const model_predictions_tidbits = {
    dense_model_tidbit: 'This model uses a dense neural network, and was trained on tabular data, which you can see under the Stellar Properties tab',

    spectrogram_model_tidbit: 'This model uses a Bidirectional LSTM (Long Short-Term Memory) model, and was trained on Spectra data, which you can see under the Spectral Viewer tab. ',

    fusion_model_tidibt: 'This model fuses the outputs of the previous two models, and applies a cross attention mechanism to achieve a final output.',
}

const model_descriptions_complex = {
    dense_model:{
        architecture_overview: 'The StarTrack Dense model is a fully connected deep neural network designed for classification tasks with an input feature size of 27 and an output size of 8 classes. The architecture consists of three main linear layers with decreasing hidden sizes of 1024, 512, and 512 neurons respectively, followed by batch normalization to stabilize and accelerate training. After each batch normalization, a LeakyReLU activation function introduces non-linearity, and dropout with a rate of 0.3 is applied to mitigate overfitting by randomly deactivating neurons during training. The final linear layer maps the processed features to the output logits corresponding to the target classes. This design balances model capacity and regularization to effectively learn complex patterns from structured tabular input data.',
        data_overview: 'The Dense model\'s training pipeline consisted of 800k+ examples of stellar feature data (Training: 513k, Validation: 128k, Testing: 160k w/ 80% accuracy), with features corresponding to those under the "Sellar Properties" page'
    },
    spectrogram_model:{
        architecture_overview: 'The StarTrack LSTM model is a sequence-based neural network designed to process input sequences shaped as (batch_size, 1024, 1), making it well-suited for time-series or spectral data classification with 9 target classes. It employs a multi-layer bidirectional LSTM with three layers and a hidden size of 256 per direction, allowing the model to capture both forward and backward temporal dependencies. A dropout rate of 0.5 is applied within the LSTM layers to reduce overfitting. The final hidden states from both directions are batch normalized before passing through a fully connected layer with ReLU activation, followed by dropout for further regularization. The output layer maps the learned features to the nine class logits. Additionally, the model provides a feature extraction method that outputs the high-level learned representation before the final classification layer, useful for downstream tasks or embedding analysis. This architecture balances temporal feature extraction with robust regularization to handle sequential data effectively.',
        data_overview: 'The LSTM model\'s training pipeline comprised of only 24k+ examples of star spectra data (This smaller data size is a result of complications w/ the datasource, which is more thoroughly explained in the Repository\'s Jupyter Notebooks) from SDSS 17 .fits files. The acquired spectrograms were then normalized using Z-Score, and compressed into a shape of (1, 1024) so as to be used by the LSTM. '
    },

    fusion_model_complex_overview: 'The StarTrack Fusion model integrates two pretrained subnetworks: a bidirectional LSTM branch and a dense fully connected branch—each specialized in extracting complementary features from sequential and tabular data respectively. To leverage their strengths while preventing overfitting, most parameters in both branches are frozen except for the first fully connected layer in each, allowing limited fine-tuning. The core fusion mechanism applies a multi-head cross-attention module that lets the LSTM-derived features attend to the dense features after projecting them into a compatible embedding space. This cross-attention output is combined with the original LSTM features, capturing intricate interdependencies between sequence and tabular representations. The concatenated fused features then pass through a series of nonlinear transformations, batch normalization, dropout, and linear layers culminating in classification logits over nine classes. ',
}