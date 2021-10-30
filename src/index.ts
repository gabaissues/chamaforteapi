import Express from './functions/server';
import './databases/mongoose'

interface Options {
    port: number
}

class Core {

    public options: Options;
    constructor(options: Options) {

        console.log('[core] Core iniciado com sucesso.')

        this.options = options
        this.loadExpress()

    }

    public loadExpress() {
        
        console.log('[express] Express sendo iniciado.')
        new Express(this.options.port)

    }
}

new Core({
    port: 3333
})