
class InputData extends EventTarget
{
    cursorPos: { x: number, y: number };
    lastKeyPress?: string;

    private _evListeners = {
        'click': this.onClick.bind(this),
        'mousemove': this.onCursorMove.bind(this),
        'keypress': this.onKeyPress.bind(this),
    };

    constructor()
    {
        super();
        this.cursorPos = {x: 0, y: 0};
    }

    attachEvents()
    {
        Object.entries(this._evListeners).forEach(([key, listener]) => {
            window.addEventListener(key, listener);
        });
    }

    detachEvents()
    {
        Object.entries(this._evListeners).forEach(([key, listener]) => {
            window.removeEventListener(key, listener);
        });
    }

    onClick()
    {
        this.dispatchEvent(
            new Event('click')
        );
    }

    onCursorMove(ev: any)
    {
        this.cursorPos.x = ev.clientX;
        this.cursorPos.y = ev.clientY;
    }

    onKeyPress(ev: any)
    {
        this.lastKeyPress = ev.key;
        this.dispatchEvent(
            new Event('key')
        );
    }
}

class Game extends EventTarget
{
    name: string = '';
    description: string = '';
    averageScore: number = 0;
    topScore: number = localStorage["rta-" + this.name] ?? 0;
    keys: string[] = [];

    private _canvas: HTMLCanvasElement | undefined;
    private _ctx: CanvasRenderingContext2D | undefined;
    private _inputData: InputData = new InputData();
    private _doLoop: boolean = false;
    private _setup: boolean = false;

    private _evListeners: { [key:string]: () => void } = {
        'click': () => { this.onClick(this._inputData) },
        'key': () => { this.onKeyPress(this._inputData, this._inputData.lastKeyPress ?? '') }
    };

    constructor()
    {
        super();
    }

    setup(canvas: HTMLCanvasElement)
    {
        if(!this._setup)
        {
            this._inputData.attachEvents();
            Object.entries(this._evListeners).forEach(([key, listener]) => {
                this._inputData.addEventListener(key, listener);
            });
        }

        this._canvas = canvas;
        this._ctx = canvas.getContext('2d') ?? undefined;
        this.resize();
        this._setup = true;

        this._doLoop = true;
        this.loop();
    }

    resize()
    {
        if(this._canvas)
        {
            this._canvas.height = window.innerHeight;
            this._canvas.width = window.innerWidth;
        }
    }

    setHighScore(score: number)
    {
        this.topScore = score;
        localStorage["rta-" + this.name] = score;
    }

    onClick(inputData: InputData)
    {}

    onKeyPress(inputData: InputData, key: string)
    {}

    exit()
    {
        this._doLoop = false;
        this._inputData.detachEvents();
        Object.entries(this._evListeners).forEach(([key, listener]) => {
            this._inputData.removeEventListener(key, listener);
        });
        this._setup = false;
        this.dispatchEvent(
            new Event('exit')
        );
    }

    loop()
    {
        if(this._ctx && this._canvas)
        {
            this.updateTick(this._inputData);
            this.renderTick(this._ctx, this._canvas.width, this._canvas.height, this._inputData);
        }
        if(this._doLoop)
            requestAnimationFrame(this.loop.bind(this));
    }

    updateTick(inputData: InputData)
    {}

    renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {}
}

export {
    InputData,
    Game
};
