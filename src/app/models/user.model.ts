import { Role } from './role.model';

export class User {
  constructor(
    public sifraradnika?: number,
    public email?: string,
    public role?: Role,
    public password?: string,
    public za_sif_sekret?: number,
    public sif_oblast?: number,
    public ime?: string,
    public lozinka?: string,
    public sifra_pp?: number
  ) {}

  get roleString(): string | undefined {
    return this.role !== undefined ? Role[this.role] : undefined;
  }
}
