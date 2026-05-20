import client from "../api/client";
import type { LpListResponse, LpDetail } from "../types/Lp";

const lpRepository = {
    getList: (cursor?: number): Promise<LpListResponse> => {
        return client.get('/v1/lps', {
            params: { cursor, order: "desc" }
        }).then(r => r.data.data)
    },
    getLp: (lpId: number): Promise<LpDetail> => {
        return client.get(`/v1/lps/${lpId}`).then(r => r.data.data)
    },
    getLpWithTag: (tag: string, cursor?: number): Promise<LpListResponse> => {
        return client.get(`/v1/lps/tag/${tag}`, {
            params: { cursor, order: 'desc' }
        }).then(r => r.data.data)
    }
}

export default lpRepository;