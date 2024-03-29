import { pool } from '@/lib/DB-connection';
import { type Response, BasicInfo } from '@/types/my-types';
import { type NextRequest } from 'next/server';



export const runtime = "edge"




export interface Skill {
    name: string;
    level: number;
    icon: string;
    id: string;
}
export interface SkillSetResponse {
    data?: Skill[],         // data
    error?: string,        // error
    success: boolean,      // success
}

export async function GET(req: NextRequest, { params: { locale } }: { params: { locale: string } }) {

    try {
        const client = await pool.connect();
        const query_ar = 'SELECT "name_ar" as "name", "level",  "icon" , "id" FROM skills';
        const query_en = 'SELECT "name_en" as "name", "level",  "icon" , "id" FROM skills';
        const query = locale === 'ar-EG' ? query_ar : query_en;
        const { rows } = await client.query(query);
        const response: SkillSetResponse = { success: true, data: rows };
        client.release();
        return Response.json(response);
    } catch (error) {
        const response: SkillSetResponse = { success: false, error: 'Unable to connect to the database' };
        return Response.json(response);
    }
}
