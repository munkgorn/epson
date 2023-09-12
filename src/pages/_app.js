import { SessionProvider } from "next-auth/react";
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
  } from 'recoil';
import "@/styles/globals.css";

export default function App({
	Component,
	pageProps: { session, status, ...pageProps },
}) {
	
	return (
		<RecoilRoot>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</RecoilRoot>
	);
}
