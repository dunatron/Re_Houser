if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,d)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const f={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return f;default:return e(a)}})).then(e=>{const a=d(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-234fc267"],(function(e){"use strict";importScripts(),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/03be87b9fcb57c20473e1290353ba276161b1d4a.cc264bd486bd09aed201.js",revision:"44f8659de4fa3bd3a770d3667b4d4b3c"},{url:"/_next/static/chunks/05723c6631c4544ca724447edefe404cb1379d4b.8df14b23887c5373c307.js",revision:"19b325361e913941e07467d0f4200819"},{url:"/_next/static/chunks/077157d09fa692df4b7e80d4f2bc1ab8d73aaa74.ccbae1a30505aaad971a.js",revision:"6a5333c03ab621da2fc7413c4a776ba0"},{url:"/_next/static/chunks/0c43f133cdbd6f5054cc60a0dad78479bad81ba8.0e4ff14aa2584e4be499.js",revision:"cbd1b19cd4f55bc44e8e84e6effa5698"},{url:"/_next/static/chunks/110.14dff6ba20792d524979.js",revision:"9261bde336a8e6e4c12195a4617dfbb3"},{url:"/_next/static/chunks/111.8f08cc06a3980de86d56.js",revision:"d8130edffb47aea4b1ffc50104158646"},{url:"/_next/static/chunks/112.a750a7fd53d8c1a596b7.js",revision:"d0114972a328b752cfaa9e53bf53c4da"},{url:"/_next/static/chunks/113.3b5222b020149ba4b6be.js",revision:"99b5916c4f0c3f410807260a44e8460a"},{url:"/_next/static/chunks/114.7f0c457388f9b5378ecc.js",revision:"f584d25f5ec6297dacb861c3382e4e0f"},{url:"/_next/static/chunks/115.67a0e0b751c360388958.js",revision:"ad75adc4d0bdc4576f7c7340b71be2dc"},{url:"/_next/static/chunks/116.2a0769f9f0efc974159d.js",revision:"c8b1c1da2f186c279a4fca7b79b1428a"},{url:"/_next/static/chunks/117.cc6afdc9cd3eec19ec6b.js",revision:"a02619a317d47cd82b27f17a5c513c6e"},{url:"/_next/static/chunks/117eda32b9e655853babf1b0e1f900bee1f41572.31709e6789014fb5c002.js",revision:"0414e6445d675831941398406a8970e7"},{url:"/_next/static/chunks/118.b8a2d030bb2d375feeb3.js",revision:"b88ebd2923f4080606a1cc2d74740fa5"},{url:"/_next/static/chunks/1223b525931e23c7dda3b8919cc2e38b0649cead.8310e474e960ff863a63.js",revision:"8c2def3811fd602d26ac0c798d00a0eb"},{url:"/_next/static/chunks/1ad886c7eca84612879051c71e5a85c83d2c1f00.3a3f90cba4ff63a6aba6.js",revision:"fe66eb98ba64757de12aae884c977aff"},{url:"/_next/static/chunks/1b2b13b42bc1790505851d60e92fc79a0f3accb8.800fef1192850342d601.js",revision:"d3baeff8fbdc47949082b15a2b0dbcdc"},{url:"/_next/static/chunks/1bfc9850.4ac2b45abe20fda978c0.js",revision:"ddcc67e884c37b00e9e14fdc97dbb412"},{url:"/_next/static/chunks/210e6083.3783e85d142ad997b202.js",revision:"e69394a14ab9de4ef3260cec77426ebc"},{url:"/_next/static/chunks/21f62dbdf12a6936942d428fc311b6b9a4c3700c.17400b23ee45b06771cf.js",revision:"00f575b32b5ab916fe69eab9bb141d0b"},{url:"/_next/static/chunks/2d12b0880d11d1d8490a98e6f2105a019fd2d73d.c5d44dc008729bc7f8d3.js",revision:"e421395c598c85999cbc0e75dfbd3b34"},{url:"/_next/static/chunks/30ac27d982a86a572f22da1a3d9bad7fb762ade7.d9deb781b61231503e72.js",revision:"521c6c047a8dc20459b0162d2c50decb"},{url:"/_next/static/chunks/40e86e61fb7f9d3e18a2caf80a6f6359848fad65.c81c66478c7874bd474f.js",revision:"ded931a5c7e5f1bd196a0265bd4cbe67"},{url:"/_next/static/chunks/4482784235d0ea33f2e24e525468e34c342f2d28.90d3804b5aa12c7ed78e.js",revision:"fc0c524efb146691d02bbe4e5b009631"},{url:"/_next/static/chunks/4936a00f2efc26a212cd194b36db7fc64a517943.c88e4f426bf3e8d11eb9.js",revision:"07613f269d2c9df25ec4dc1639720886"},{url:"/_next/static/chunks/4d7cda7eed10eac26d1649bc3182d4d158b021e9.a5abbce71346964a5ebe.js",revision:"441794576f174fbf03f3e5b4c111a08a"},{url:"/_next/static/chunks/556c48f4e743479d89e129206cb2000ec09c5397.6afd6dd6e49f547f754e.js",revision:"9f991dbbd66cdbb2b708060fdb905731"},{url:"/_next/static/chunks/5790ae959a35723cb09520282eaca3c9060554cc.0ff7b660a4fe7252a9cd.js",revision:"67382b5ec31f64e467c1d6fab9dc34e0"},{url:"/_next/static/chunks/5e3c34b37b84aa63ae8d3d011856a107354a8779.f0c8cc4f8b29afa3cb21.js",revision:"39a2e57f4e56861884565cef3c95b6b5"},{url:"/_next/static/chunks/6b6840487fd01dd64d87d05229a1697f9817404d.3ea79f335ba3013c493a.js",revision:"58ddbf9d218cbbca579904fbe96dba9b"},{url:"/_next/static/chunks/6d20e1f51a178aa5b36ddbfe2595d63e3aa7236e.40f48fb8451b540ad788.js",revision:"08ff8cc74caf0aefef0b9a69b2120287"},{url:"/_next/static/chunks/72a30a16.f2f11432ac2271170360.js",revision:"29fdb8f875cf6781f009199319aca011"},{url:"/_next/static/chunks/75fc9c18.32aeb856c99454dee28e.js",revision:"e0db26e760778f405ae9b06e8e704380"},{url:"/_next/static/chunks/772e4df69a87346a9450df74d8125d4de6d0f863.6cf18b5ff5285febb0bb.js",revision:"fdc7f2eb6e11c62e4866db2dece6428b"},{url:"/_next/static/chunks/7f33654a3e776b3353193622ef616cbb379b025c.a2ef02509b72e990029a.js",revision:"28a0a5805e6dc8397a7c84e9a58af6fc"},{url:"/_next/static/chunks/84c042bb.9536d29c4e3fc001c464.js",revision:"0c1841413d8677b7d8cb6238d9faf5ac"},{url:"/_next/static/chunks/96f92d05ebd409d539edb3db34fb83e29f5cfa0f.26c6b244e56bf61d1406.js",revision:"6f3e039d68708df98cd8b50e2a3502fb"},{url:"/_next/static/chunks/9b50ba0f281ef28ad925917d7d42a935b7a542ba.21f035d2141e3261652e.js",revision:"8bcc30639bca2c90310bf8a3eaed4317"},{url:"/_next/static/chunks/a3a0b8c0b5aa38e805bd359b92cfd6029d9050e3.985bb0bbfcea192f4a92.js",revision:"285d4ac00fc5f1a4a83a7343ffc7aa80"},{url:"/_next/static/chunks/adaf7a1124d17816e1904b92ead5f7cd0c01f8de.750f61bed32d735958d1.js",revision:"3dd05e508a9ed1f636a6b7870604a228"},{url:"/_next/static/chunks/adc0c898e2a0e5f0cf365f6276b5adcb5de75baf.de523bf1aeb4ffca00c5.js",revision:"5b635dd2bffa237a72be32d6cf11ad6a"},{url:"/_next/static/chunks/b4a3d7e5fab2faa81190c3d676dd00ba81a8e2c7.96d9870d148a5b151c79.js",revision:"d60e043b14253f46884b58a42d1ee379"},{url:"/_next/static/chunks/b9468c8523eb8fb549538b45bdda038fcda3c9ea.ffae49a8f4ee0310d610.js",revision:"3029edc5091b3accd3964648f37c741c"},{url:"/_next/static/chunks/bee240a3.c43ff07555b0932a2f8d.js",revision:"d1bc30b9b88226742f5d43a0079cf6bc"},{url:"/_next/static/chunks/c8ee6360213caf0dc87b472a93274c811460f331.fda1875e94c75270b65e.js",revision:"041b06a18872c164e0d54be84b378626"},{url:"/_next/static/chunks/c9c6fe98.40905329241fc1f4873d.js",revision:"aa7ab980a6f8a19ac212e91128c319ec"},{url:"/_next/static/chunks/ca31e254b3128424776b2f7f05b31dc5ff7dd131.b074bb4777882bd21e7d.js",revision:"60106d3ba1f4626db59c838ff7dd7f47"},{url:"/_next/static/chunks/cedafaba3f9574071bf240e085f8c7cafae171fe.9dce48178f77777aa173.js",revision:"ff5e8d99d850d0ac821f1555350516bb"},{url:"/_next/static/chunks/d3f4d7e4431470ad03759645f0881805bc330ff4.5cb802126cc2d0312628.js",revision:"d649adfa13fd5fdec74dc0d6d631af87"},{url:"/_next/static/chunks/d7ca8ffd108a5bd1b7fe96da7a369ebbdcd10f42.2581ec15d2f52f84e92c.js",revision:"5d21f39d5a6f5c848f0bca71f486fa3e"},{url:"/_next/static/chunks/d903de806a550dbb7dd4f49c559abe3c267d962b.ddd19763d5a034b15f54.js",revision:"b6eaa42bf982734df0b6fd47e987cab2"},{url:"/_next/static/chunks/dc38a858eb4608dd776f7b1454bb03cd3a6f2f9f.770d508e88dae4602de8.js",revision:"55b528a5ada8c10609ce5dde54fc6949"},{url:"/_next/static/chunks/e0498a6782b7b38c26038650389d7379878705cd.201e0cad7d5e1ef3a1a8.js",revision:"403078183d2ac208953851bb87b26e69"},{url:"/_next/static/chunks/e3fd714c17e86608368969d1b3cb4d263877e5ca.da5ed2381f18d50b6e77.js",revision:"caf2e5da2879c83c9aceeccb1bcd4d00"},{url:"/_next/static/chunks/e78312c5.ed1a0ceb73926783b6b5.js",revision:"b62131b4aedb6d76df610d5474ef89e9"},{url:"/_next/static/chunks/f057a831.fc3395f019a50c1fd56c.js",revision:"f60fc5e20f8aa29ed22d6b90a2e4b238"},{url:"/_next/static/chunks/f9fff01a.aad120325789a8953936.js",revision:"ac29b2d966e4382e0524ddbf4df94e40"},{url:"/_next/static/chunks/framework.42e9734a928aad93679a.js",revision:"8ed8523be98bc1de219f5a47a8c4d0e4"},{url:"/_next/static/chunks/main-96e95d36e8b16437a13e.js",revision:"efc07f7f5c809ec8d70cead58fa9b9e0"},{url:"/_next/static/chunks/pages/404-3530d9b94e3a369f29b9.js",revision:"86351b6e0e3bddf0fac1ddec27a5ff19"},{url:"/_next/static/chunks/pages/_app-61992cb9e6a2d4774f73.js",revision:"c0543564e8e3a1f46bf44d3b04c8242b"},{url:"/_next/static/chunks/pages/_error-6aefb8daa89a20ee6be4.js",revision:"a33a6fb434f609e0c273a181f2dca49d"},{url:"/_next/static/chunks/pages/about-us-202cfb83a55acd62660c.js",revision:"8a8789f96b94f425eb3ec0907befb621"},{url:"/_next/static/chunks/pages/about-us/%5Bname_url%5D-ad32b2ba9031236ac3bc.js",revision:"a3dbb18fa6e306f7be9aaaa2831c1ebd"},{url:"/_next/static/chunks/pages/account-ee43c7580973195ac571.js",revision:"d6a7b1affde0ae17d72b6db839ccb32f"},{url:"/_next/static/chunks/pages/account/confirm-03f4a7ddb2d8828395c8.js",revision:"4611b14bfdf0dbf49f10474b7ea4042e"},{url:"/_next/static/chunks/pages/account/confirm/%5Btoken%5D-4b5da7c5ff3dc2f132d6.js",revision:"cc431f1ef8c01789cb526dbb89f2c21f"},{url:"/_next/static/chunks/pages/account/signature-6fc25ac61913d1ab57ba.js",revision:"a4803b366c23ec8e98a39e782795c684"},{url:"/_next/static/chunks/pages/activity-ba38e53cc2ea04816063.js",revision:"cced199c2e497fbeec2db0c6be6b9063"},{url:"/_next/static/chunks/pages/admin-2d17b3d524879b583aac.js",revision:"619d5a548a9e113554de13ec9d51c809"},{url:"/_next/static/chunks/pages/admin/applications-3d116d46aa327ada89a9.js",revision:"f16e1839ef059ec79a9e4b9ea4dd5453"},{url:"/_next/static/chunks/pages/admin/appraisals-51a70c9f70fa98179513.js",revision:"32082f0c7a6dddaf0fd1dcd0eb396bc6"},{url:"/_next/static/chunks/pages/admin/inspections-2da6145db6ab2c6f7d0b.js",revision:"90646c2768c26916b8d9b3a6f4972184"},{url:"/_next/static/chunks/pages/admin/properties-a94337428ef31eaf977f.js",revision:"326264d73ac549c2b49fe859c40095f7"},{url:"/_next/static/chunks/pages/admin/settings-5a83bd55c077c490efff.js",revision:"f0ac7f7c3dc94c3f180079af1b7e37bd"},{url:"/_next/static/chunks/pages/admin/test/server-crashes-f33c1f5f553372632405.js",revision:"7fe096b9f8423770929a2bad0ae9e9aa"},{url:"/_next/static/chunks/pages/admin/typography-0cd0005c704cdd618d47.js",revision:"51f60a1b1d8397ab77e58c1c7c7b42e1"},{url:"/_next/static/chunks/pages/admin/users-db79c0e57eec662fc431.js",revision:"ba683efc4a4008cc88c9a28be4edd8ba"},{url:"/_next/static/chunks/pages/contact-370317e30985b7dcc984.js",revision:"669399b7529b737264d8b0a8186074e5"},{url:"/_next/static/chunks/pages/find/property/%5Bid%5D-a258d5e2becee4d73e82.js",revision:"fe98d115c47462ee9e6df0e47cf214f3"},{url:"/_next/static/chunks/pages/freeappraisal-e6586321cd95d7e4accb.js",revision:"0a138cb300c1555e3920bafe5cedcb55"},{url:"/_next/static/chunks/pages/index-8803cf290d8f82b8803a.js",revision:"e7ef58c285851f728b8e7f448a51e9ca"},{url:"/_next/static/chunks/pages/inspection-3f93c9be627ceaac4afe.js",revision:"ef830e1c8052acbced0c289f90b3af24"},{url:"/_next/static/chunks/pages/inspection/%5Bid%5D-90dfbfffc020fce2361a.js",revision:"d0bb4ac903d6e85bb9c25a184757c752"},{url:"/_next/static/chunks/pages/landlord-4d81a2ebc81fe9bb5295.js",revision:"faa65d874b63004f7e4505accb928a90"},{url:"/_next/static/chunks/pages/landlord/appraisals-833373bd9251e91a78a4.js",revision:"930d770893bede6dff2640fb5e560c84"},{url:"/_next/static/chunks/pages/landlord/appraisals/%5Bid%5D-568dc0f8e67fefefcde0.js",revision:"48f5cadfa03716e741789053f420ae89"},{url:"/_next/static/chunks/pages/landlord/appraisals/add-b7106ebda145a134f531.js",revision:"bcdef32703948452090939790d30bb61"},{url:"/_next/static/chunks/pages/landlord/fees-3e5750db52e9cff37476.js",revision:"e4a9e877cc7fd8f7d1901b2b58c14594"},{url:"/_next/static/chunks/pages/landlord/leases-f8c9cfded051be8b5a1c.js",revision:"9c49b34c0ba34e43b997d978bfbe94e2"},{url:"/_next/static/chunks/pages/landlord/leases/%5Bid%5D-8c25108b81c7d1a5e273.js",revision:"74c27f731e9cae9d894afdd7817eaaec"},{url:"/_next/static/chunks/pages/landlord/properties-2c384a553400f98d15fc.js",revision:"0c0eeeb4c373ce6678d24ac56f3fe410"},{url:"/_next/static/chunks/pages/landlord/properties/%5Bid%5D-33872763a1f64e15e724.js",revision:"fa27fd92f99daba6a18a11a483076140"},{url:"/_next/static/chunks/pages/landlord/properties/%5Bid%5D/edit-506942bc881939c3230b.js",revision:"bae4a19b16ccb78427094f1749d895ad"},{url:"/_next/static/chunks/pages/landlord/properties/add-5258bcce1195edb34482.js",revision:"95ce208c5b022c4cc25c52fdd1abf52c"},{url:"/_next/static/chunks/pages/landlord/properties/bulkadd-098ba2fb99c5e572b1c2.js",revision:"aad5967fa10b1e195a16292f2a2f3029"},{url:"/_next/static/chunks/pages/landlord/terms-of-engagement-e7c5c518b0f6c396a3a6.js",revision:"bbb9d80e8d322266b315724fb5c52b0a"},{url:"/_next/static/chunks/pages/legal-1f3e1ef2ed412ee62833.js",revision:"c0cad189a819c217803412695ec7b2d0"},{url:"/_next/static/chunks/pages/legal/privacy-policy-fd28a37fae67bda7abf8.js",revision:"1257f4c1469d6b7eece8a76a415153ec"},{url:"/_next/static/chunks/pages/legal/terms-of-engagement-5f68df3d89a8ee155038.js",revision:"2258012f7c1e6f27b613ee45ed822c1c"},{url:"/_next/static/chunks/pages/login-5069009bd637e6287135.js",revision:"394c2705396c15935326e8116449a167"},{url:"/_next/static/chunks/pages/messages-72d7ed2e545af1793e69.js",revision:"b769e9692ceee0d762142e52d33ba4bd"},{url:"/_next/static/chunks/pages/property-search-aaa05f1ca25213f8b9d4.js",revision:"55efaeeea29a68694f04daa6df2571c2"},{url:"/_next/static/chunks/pages/reset-eb6d0baa93892889e445.js",revision:"aa827f66008433a3995b6fa36014b7bd"},{url:"/_next/static/chunks/pages/reset/password-3b8525efa6c28e17bf9b.js",revision:"00aee3691634218480df27a2b025363d"},{url:"/_next/static/chunks/pages/reset/password/%5Btoken%5D-fefd246eaf499ced4d31.js",revision:"f46e6b3ee370050535afecbc254dea54"},{url:"/_next/static/chunks/pages/social-bd9ae61f8dbd543476c9.js",revision:"e0ad2a396983707fc5b857143fe140ff"},{url:"/_next/static/chunks/pages/social/chats-2b4e80ee12d7e8d29164.js",revision:"ff36f9c486f515dd8d70b5ebf1b6b93b"},{url:"/_next/static/chunks/pages/social/chats/chat-f135a192067731264206.js",revision:"7efe1bae7377c4298edd485656c503fa"},{url:"/_next/static/chunks/pages/social/friends-394069e2330b8aa908dc.js",revision:"ece5707bbf4bb49fd07ca894d9a4f2c6"},{url:"/_next/static/chunks/pages/social/groups-13f21b725b970bce37ca.js",revision:"e70079a6310a6a71428607d283542697"},{url:"/_next/static/chunks/pages/tenant-5402d2889d6bd99eb642.js",revision:"0a0b93d0c99f2203a351ad1ff0793db1"},{url:"/_next/static/chunks/pages/tenant/applications-47128d7464ae86e2eacc.js",revision:"32f7506723b039ffa582be489aa24567"},{url:"/_next/static/chunks/pages/tenant/applications/%5Bid%5D-d4d23546a5a5f615166b.js",revision:"71e08172e79806b7dff183a6c6c28ef7"},{url:"/_next/static/chunks/pages/tenant/leases-7286b4128b5cdf202d18.js",revision:"ab0bed28e56b357dcd5b716a28388343"},{url:"/_next/static/chunks/pages/tenant/leases/%5Bid%5D-c7f70759cd4966e4cfbe.js",revision:"92aab91dd5275d845edc56648fe0e882"},{url:"/_next/static/chunks/pages/tutorials-65b5cbd4fd0c0bbc80ad.js",revision:"564b434a5f76d88a57bb8c8f3229c527"},{url:"/_next/static/chunks/polyfills-1b3724a9e57553954bd8.js",revision:"ff59e9e0010bc19cd704f97244e3ac18"},{url:"/_next/static/chunks/webpack-36f549a9b5f92976f7ee.js",revision:"8422ce14ad69970a3d4df9897e789da6"},{url:"/_next/static/css/35f2ff75a062cc742bbd.css",revision:"7af7a823d52771856728b3b9bef20e3e"},{url:"/_next/static/jwnYBOY2C3ZMxXeGtf9JC/_buildManifest.js",revision:"6461f1e576b375cdf44932d77b5bdf9b"},{url:"/_next/static/jwnYBOY2C3ZMxXeGtf9JC/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/css/customToast.css",revision:"ededa6f76b0f8102afc46f78d31f990e"},{url:"/css/geosuggest.css",revision:"214d860e7aa2b2b8ba20185bdc30c835"},{url:"/css/nprogress.css",revision:"c42514ad5e7fc0d3665d03585addfac4"},{url:"/css/rehouser-fonts.css",revision:"b026cae4d2adbf1e97e7df4158526b60"},{url:"/fonts/azo-sans/AzoSans-Bold.otf",revision:"b8f2ee5e72f28178899433cb91119c47"},{url:"/fonts/azo-sans/AzoSans-Bold.ttf",revision:"a4b0c7481bf5f3e12ae73efaed581108"},{url:"/fonts/azo-sans/AzoSans-Bold.woff",revision:"1bf6df8ef8367775fdb64682e16eb3aa"},{url:"/fonts/azo-sans/AzoSans-Regular.otf",revision:"87eeb2d253cb1bbf92f26bcfb76e0887"},{url:"/fonts/azo-sans/AzoSans-Regular.ttf",revision:"6c79f7fd645c0d39b4ca10428237984a"},{url:"/fonts/azo-sans/AzoSans-Regular.woff",revision:"652632abd81aeeb698f941982dce4eab"},{url:"/icons/favicon.ico",revision:"3122f01505642d6a660f6d5bbf91e80f"},{url:"/icons/icon-192x192.png",revision:"0a82684738b7da76a600ebe2caba5286"},{url:"/icons/icon-256x256.png",revision:"a4073517e5627617cac8038d10b39552"},{url:"/icons/icon-384x384.png",revision:"feeca63876c81638b07b3e4f5666ed15"},{url:"/icons/icon-512x512.png",revision:"5f42a17ec77da302931545ac2ec67f02"},{url:"/images/banners/home-page-banner.jpg",revision:"2e0e48b071b2c367665bbd3e7a65704b"},{url:"/images/person-icon.png",revision:"efa5e591a725f0b25bb9772a0641e79c"},{url:"/images/person.png",revision:"c84b28d4ddc12def5b1339f78de11d40"},{url:"/images/private_stock.jpg",revision:"b983f3db98a74446f5b816760714e99b"},{url:"/images/rehouser_logo.png",revision:"3103e2eb1f20c8258709a0ba5ddf7661"},{url:"/images/signatures/rehouser_admin_signature.png",revision:"0c1d791522cd227ececf56aba4c0041f"},{url:"/images/svg/ReHouser_bare_logo.svg",revision:"378570bfec8999f485528094e2bdbbea"},{url:"/images/svg/ReHouser_main_logo_original.svg",revision:"52c00aedf1ccb484233e94a51ae574a4"},{url:"/images/svg/rehouser_ico_dimensions.svg",revision:"138a4cea9bdda2231ca750aa6a232953"},{url:"/images/svg/small-deer.svg",revision:"8ce467fcb15154d65b6efcfe7e97edc1"},{url:"/images/team/heath_dunlop.jpg",revision:"26c03b4109d1cc2f4a8653e5b6b0f99e"},{url:"/manifest.json",revision:"3e54e3ba6ca080b68263ff92cc690d7b"},{url:"/static/ReHouser_bare_logo.ico",revision:"746ab3537a8ff8dff64ff648e13d053c"},{url:"/static/favicon.ico",revision:"85dc1b580b39e9d9f3e2e8e32b80372c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.StaleWhileRevalidate({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
