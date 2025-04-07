// if (!req.cookies?.user_id) {
//     console.log("비로그인")
//     return res.sendFile(path.join(publicPath, "runner", 'main.html'));
// }

// if (!req.session?.user_id) {
//     req.session.auth = await findUserById(req.cookies?.user_id);
//     console.log({ session: !!req.session.auth })
// }

import { findUserById } from "../models/user.js";

export async function checkUserFromCookie(req, res, next) {
    if (req.session.user) {
        console.log('✅ [세션 있음] 이미 로그인된 사용자:', req.session.user.nickname);
        return next();
    }

    const userId = req.cookies?.user_id;
    console.log('🧪 [쿠키 검사] user_id:', userId);

    if (!userId) {
        console.log('🚫 [쿠키 없음] 비로그인 상태로 진행');
        return next();
    }

    try {
        const user = await findUserById(userId);
        if (user) {
            req.session.user = {
                id: user.id,
                nickname: user.nickname,
            };
            console.log('✅ [DB 조회 성공] 유저 세션 저장:', req.session.user);
        } else {
            console.log('❓ [DB 조회 실패] 해당 user_id의 유저 없음');
        }
    } catch (err) {
        console.error('❌ [DB 에러] 유저 조회 중 오류 발생:', err);
    }

    next();
}
