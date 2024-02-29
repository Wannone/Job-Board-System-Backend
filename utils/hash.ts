import bcrypt from 'bcrypt';

function HashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export default HashPassword;