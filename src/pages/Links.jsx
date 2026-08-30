import React from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';

const resourceLinks = [
  ['hubfortools.com', 'https://hubfortools.com'],
  ['frivgamefreeonline.blogspot.com', 'https://frivgamefreeonline.blogspot.com'],
  ['xuyiheng.com', 'https://xuyiheng.com'],
  ['xn--tekolyst-3zae.fi', 'https://xn--tekolyst-3zae.fi'],
  ['pixabay.com', 'https://pixabay.com'],
  ['scimatic.org', 'https://scimatic.org'],
  ['divi-childthemes.com', 'https://divi-childthemes.com'],
  ['ecomtoolai.com', 'https://ecomtoolai.com'],
  ['fafnps.blogspot.com', 'https://fafnps.blogspot.com'],
  ['neocities.org', 'https://neocities.org'],
  ['anomaly-seo-southwick.online', 'https://anomaly-seo-southwick.online'],
  ['theturtleeffect.com', 'https://theturtleeffect.com'],
  ['sman1mtp.sch.id', 'https://sman1mtp.sch.id'],
  ['oranyx.ai', 'https://oranyx.ai'],
  ['redoufu.com', 'https://redoufu.com'],
  ['veridocs.cc', 'https://veridocs.cc'],
  ['x7bb.cn', 'https://x7bb.cn'],
  ['ai8080.com', 'https://ai8080.com'],
  ['kaleido.ai', 'https://kaleido.ai'],
  ['wallpaperquotes-b0c04.firebaseapp.com', 'https://wallpaperquotes-b0c04.firebaseapp.com'],
  ['toolbbs.com', 'https://toolbbs.com'],
  ['ticmusluciaast.blogspot.com', 'https://ticmusluciaast.blogspot.com'],
  ['anomaly-seo-northfield.website', 'https://anomaly-seo-northfield.website'],
  ['aplicaciones07.blogspot.com', 'https://aplicaciones07.blogspot.com'],
  ['pcgamesonline1.blogspot.com', 'https://pcgamesonline1.blogspot.com'],
  ['ailist.fr', 'https://ailist.fr'],
  ['rg.net', 'https://rg.net'],
  ['moylor.cn', 'https://moylor.cn'],
  ['soumanman.com', 'https://soumanman.com'],
  ['jishuzhan.net', 'https://jishuzhan.net'],
  ['oppalerts.com', 'https://oppalerts.com'],
  ['crowdfavs.com', 'https://crowdfavs.com'],
  ['zcrdh.com', 'https://zcrdh.com'],
  ['5.161.77.27', 'https://5.161.77.27'],
  ['hassamx.com', 'https://hassamx.com'],
  ['ee44.net', 'https://ee44.net'],
  ['saashub.com', 'https://saashub.com'],
  ['ziyk.net', 'https://ziyk.net'],
  ['libtechnophile.blogspot.com', 'https://libtechnophile.blogspot.com'],
  ['lemy.lol', 'https://lemy.lol'],
  ['mxnav.com', 'https://mxnav.com'],
  ['iforai.com', 'https://iforai.com'],
  ['kummanodan.blogspot.com', 'https://kummanodan.blogspot.com'],
  ['ucantdothat.net', 'https://ucantdothat.net'],
  ['mek8.cn', 'https://mek8.cn'],
  ['parrot.ru', 'https://parrot.ru'],
  ['herwig.de', 'https://herwig.de'],
  ['t-links-bhs.xyz', 'https://t-links-bhs.xyz'],
  ['cloudmeister.ch', 'https://cloudmeister.ch'],
  ['sumpitmassitus.blogspot.com', 'https://sumpitmassitus.blogspot.com'],
  ['n.nu', 'https://n.nu'],
  ['seo-cartel-arabica.xyz', 'https://seo-cartel-arabica.xyz'],
  ['ainavhub.com', 'https://ainavhub.com'],
  ['glarity.app', 'https://glarity.app'],
  ['beehiiv.com', 'https://beehiiv.com'],
  ['best-ai-tools.org', 'https://best-ai-tools.org'],
  ['kasihbunda.sch.id', 'https://kasihbunda.sch.id'],
  ['shadowrocketios.cn', 'https://shadowrocketios.cn'],
  ['y8game23.blogspot.com', 'https://y8game23.blogspot.com'],
  ['mellecinternetcafe.blogspot.com', 'https://mellecinternetcafe.blogspot.com'],
  ['offeu.com', 'https://offeu.com'],
  ['wondershare.com', 'https://wondershare.com'],
  ['sousuotu.com', 'https://sousuotu.com'],
  ['kyc-helper.org', 'https://kyc-helper.org'],
  ['catatansuryaone.blogspot.com', 'https://catatansuryaone.blogspot.com'],
  ['stickersmakers.cz', 'https://stickersmakers.cz'],
  ['marketingstrategyupdate.blogspot.com', 'https://marketingstrategyupdate.blogspot.com'],
  ['dlyybbs.com', 'https://dlyybbs.com'],
  ['brainly-america.com', 'https://brainly-america.com'],
  ['james-snowden-tf7.firebaseapp.com', 'https://james-snowden-tf7.firebaseapp.com'],
  ['8ch.net', 'https://8ch.net'],
  ['umbrellaartes.blogspot.com', 'https://umbrellaartes.blogspot.com'],
  ['jian27.com', 'https://jian27.com'],
  ['eisaisha.com', 'https://eisaisha.com'],
  ['best-ai-tool.com', 'https://best-ai-tool.com'],
  ['breezesys.com', 'https://breezesys.com'],
  ['habr.com', 'https://habr.com'],
  ['staysosuite.blogspot.com', 'https://staysosuite.blogspot.com'],
  ['sachindabas.com', 'https://sachindabas.com'],
  ['bambangtutorial1.blogspot.com', 'https://bambangtutorial1.blogspot.com'],
  ['mediaglobalupdate.blogspot.com', 'https://mediaglobalupdate.blogspot.com'],
  ['6ixnetwork.com', 'https://6ixnetwork.com'],
  ['manaiakalani.org', 'https://manaiakalani.org'],
  ['best-ai.org', 'https://best-ai.org'],
  ['itotoo.com', 'https://itotoo.com'],
  ['viasocket.com', 'https://viasocket.com'],
  ['emailsnest.com', 'https://emailsnest.com'],
  ['comic.studio', 'https://comic.studio'],
  ['kundareeya.blogspot.com', 'https://kundareeya.blogspot.com'],
  ['aitoolsatlas.ai', 'https://aitoolsatlas.ai'],
  ['decoupage-paper.com', 'https://decoupage-paper.com'],
  ['weva.cloud', 'https://weva.cloud'],
  ['ticmusaitor.blogspot.com', 'https://ticmusaitor.blogspot.com'],
  ['che0.com', 'https://che0.com'],
  ['maereab.blogspot.com', 'https://maereab.blogspot.com'],
  ['ixgm.com', 'https://ixgm.com'],
  ['updf.com', 'https://updf.com'],
  ['mopeio-2020.blogspot.com', 'https://mopeio-2020.blogspot.com'],
  ['crazygames-20.blogspot.com', 'https://crazygames-20.blogspot.com'],
  ['moluyao.wang', 'https://moluyao.wang'],
];

const visuallyHidden = {
  position: 'absolute',
  left: '-9999px',
  top: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

export default function Links() {
  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col">
      <PageMeta
        title="Resource Links"
        description="A curated reference list of creator and AI tool resources."
        canonical="/links"
      />
      <SiteNav />

      <main className="flex-grow max-w-[1000px] w-full mx-auto px-4">
        <h1 className="font-['Fraunces'] text-4xl md:text-5xl uppercase mb-12 text-center">
          Resource <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>Links</span>
        </h1>
        <p className="text-center" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.55)' }}>
          Reference sites for creators and researchers.
        </p>

        <div aria-hidden="true" style={visuallyHidden} role="list">
          {resourceLinks.map(([label, href]) => (
            <a key={href} href={href} rel="noopener noreferrer" role="listitem">
              {label}
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
