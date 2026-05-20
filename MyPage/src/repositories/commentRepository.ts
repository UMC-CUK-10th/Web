import client from "../api/client";
import type { Comment, CommentListResponse } from "../types/Comment";

const commentRepository = {
    getList: (lpId: number, cursor?: number): Promise<CommentListResponse> => {
        return client.get(`/v1/lps/${lpId}/comments`, {
            params: { cursor }
        }).then(r => r.data.data)
    },
    create: (lpId: number, content: string): Promise<Comment> => {
        return client.post(`/v1/lps/${lpId}/comments`, { content })
            .then(r => r.data.data)
    },
    update: (lpId: number, commentId: number, content: string): Promise<Comment> => {
        return client.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content })
            .then(r => r.data.data)
    },
    delete: (lpId: number, commentId: number): Promise<void> => {
        return client.delete(`/v1/lps/${lpId}/comments/${commentId}`)
            .then(() => {})
    }
}

export default commentRepository;