function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa{
    private nome: string;
    private dinheiro: number;

    constructor(nome: string, dinheiro: number){
        this.nome = nome ;
        this.dinheiro = dinheiro;
    }

    public getNome(): string{
        return this.nome;
    }

    public getDinheiro(): number {
        return this.dinheiro;
    }

    public setNome(value: string): void {
        this.nome = value;
    }

    public setDinheiro(value: number): void{
        if (this.dinheiro <= 0) {
            this.dinheiro = 0;
        }
        this.dinheiro += value;
    }

    toString(): string{
        return `${this.nome}:${this.dinheiro}`
    }
}

class Moto{
    private custo: number;
    private motorista: Pessoa | null;
    private passageiro: Pessoa | null;

    constructor(){
        this.custo = 0;
        this.motorista = null;
        this.passageiro = null;        
    }

    public getPassageiro(): Pessoa | null{
        return this.passageiro;
    }

    public getMotorista(): Pessoa | null{
        return this.motorista;
    }
    
    public getCusto(): number{
        return this.custo;
    }

    public setCusto(value: number): void{
        this.custo += value;
    }

    public setMotorista(nome: Pessoa): void{
        this.motorista = nome;
        
    }

    public setPassageiro(nome: Pessoa | null,): void{
        this.passageiro = nome;
    }


    public leavePass(): void{
        this.passageiro?.setDinheiro(-this.getCusto());
        if (this.passageiro?.getDinheiro() != null ){
            if (this.passageiro.getDinheiro() <= 0){
                console.log("fail: Passenger does not have enough money");
                this.passageiro?.setDinheiro(0);
            }
        }
        this.motorista?.setDinheiro(this.getCusto());
        console.log(this.getPassageiro() + " leave");
        this.setCusto(-this.getCusto());
        this.setPassageiro(null);
    }

    public drivee(distancia: number): void{

        this.setCusto(distancia);
    }
    toString(): string{

        if (this.getMotorista() == null) {
            return `Cost: ${this.getCusto()}, Driver: None, Passenger: None`;
        }
        if (this.getPassageiro() == null) {
            return `Cost: ${this.getCusto()}, Driver: ${this.getMotorista()}, Passenger: None`;
        }
        return `Cost: ${this.getCusto()}, Driver: ${this.getMotorista()}, Passenger: ${this.getPassageiro()}`
    }
}

class Adapter {
    moto: Moto = new Moto();


    setDriver(name: string, money: number): void {
        this.moto.setMotorista(new Pessoa(name,money));
    }

    setPassenger(name: string, money: number): void {
        this.moto.setPassageiro(new Pessoa(name,money));
    }

    drive(distance: number): void {
        this.moto.drivee(distance);
    }

    leavePassenger(): void {
        this.moto.leavePass();
    }

    show(): void {
        console.log(this.moto.toString())
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
