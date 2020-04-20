module.exports = {
    //  Conjunto de configurações criadas por terceiros
    presets: [
        //  Converte o código js de acordo com o ambiente da aplicação
        '@babel/preset-env',
        //  Adiciona as funcionalidades do react na converção acima
        '@babel/preset-react'
    ],
    plugins : [
        //  Permite a utilização do async/await
        '@babel/plugin-transform-runtime'
    ]
}