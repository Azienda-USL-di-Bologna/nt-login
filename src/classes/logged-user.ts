import { RUOLI, Ruolo, bUtente, bRuolo } from "@bds/nt-entities";

export class LoggedUser {

    private userInfoMap: any;

    constructor(userInfoMap: any) {
        this.userInfoMap = userInfoMap;
    }

    public getField(key: string): any {
        return this.userInfoMap[key];
    }

    public isUG(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.UG]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isMOS(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.MOS]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isOS(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.OS]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isCA(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.CA]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isCI(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.CI]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isAS(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.AS]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }

    public isSD(): boolean {
        const ruoliTrovati: any[] = this.getField(bUtente.ruoli).filter((r: any) => r[bRuolo.nomeBreve] === RUOLI[RUOLI.SD]);
        return (ruoliTrovati && ruoliTrovati.length > 0);
    }
}
