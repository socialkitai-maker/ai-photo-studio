import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PortalHero.css';

const CARDS = [
  { title: 'Background Zero', desc: 'One click erases any backdrop with clean, honest edges', color: '#c3e3f4' },
  { title: 'Infinite Upscale', desc: '4x the detail with none of the loss or the blur',        color: '#dcedc2' },
  { title: 'Instant Results', desc: 'Upload to a finished frame in seconds, no skill needed',  color: '#f0e4c0' },
  { title: 'Studio Grade',    desc: 'Removed, refined and ready for print or profile',         color: '#f3cdd6' },
  { title: 'Edge Keepers',    desc: 'Hair, fur and fine lines cut crisp at every boundary',    color: '#dcd2f2' },
  { title: 'Free Forever',    desc: 'No signup, no watermark, no catch in the small print',     color: '#dcedc2' },
  { title: 'Imagine More',    desc: 'Generate whole scenes the camera never caught',           color: '#dcd2f2' },
  { title: 'Wild Pixels',     desc: 'Upscale to billboard with the print in mind',             color: '#f3cdd6' },
  { title: 'Pocket Studio',   desc: 'Every tool free on Telegram, right in your pocket',        color: '#c3e3f4' },
];

function BrandMark({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45"/>
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/>
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/>
        <circle cx="16.7" cy="20.8" r="1.45"/>
      </g>
    </svg>
  );
}

function ReelCard({ image, dotSize = 9, href, children }) {
  const card = (
    <div className="ph-reel-card" style={{ backgroundImage: `url('${image}')` }}>
      <div className="ph-card-grad"></div>
      <div className="ph-card-blur"></div>
      <div className="ph-card-content">{children}</div>
    </div>
  );
  if (href) {
    return <Link to={href} className="ph-reel-link">{card}</Link>;
  }
  return card;
}

function PlayRow({ dotSize = 9, label, num, numStyle }) {
  if (num != null) {
    return (
      <div>
        <div className="ph-num-big" style={numStyle}>{num}</div>
        <div className="ph-reel-label" style={{ fontSize: 12, opacity: 0.85 }}>{label}</div>
      </div>
    );
  }
  return (
    <div className="ph-reel-row">
      <span className="ph-reel-dot">
        <svg width={dotSize} height={dotSize} viewBox="0 0 10 10"><path d="M2 1.5l6 3.5-6 3.5z" fill="#000"/></svg>
      </span>
      <span className="ph-reel-label">{label}</span>
    </div>
  );
}

export default function PortalHero() {
  const sceneRef = useRef(null);
  const viewportRef = useRef(null);
  const worldRef = useRef(null);
  const cloudsRef = useRef(null);
  const portalRef = useRef(null);
  const curtainLRef = useRef(null);
  const curtainRRef = useRef(null);
  const sliderRef = useRef(null);
  const scene2UIRef = useRef(null);
  const scene1UIRef = useRef(null);
  const arcRootRef = useRef(null);

  useEffect(() => {
    const world = worldRef.current;
    const clouds = cloudsRef.current;
    const portal = portalRef.current;
    const curtainL = curtainLRef.current;
    const curtainR = curtainRRef.current;
    const slider = sliderRef.current;
    const scene2ui = scene2UIRef.current;
    const arcRoot = arcRootRef.current;
    const scene = sceneRef.current;
    const viewport = viewportRef.current;
    const scene1ui = scene1UIRef.current;

    const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

    const MAG = { world: 6, clouds: 9, portal: 7, curtainL: 14, curtainR: 14 };

    let curtainsOpen = false;
    let entranceDone = false;

    function setCurtainTransition(on) {
      const t = on ? 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      curtainL.style.transition = t;
      curtainR.style.transition = t;
    }
    setCurtainTransition(true);

    let rawX = 0, rawY = 0, smX = 0, smY = 0;
    function onMouseMove(e) {
      rawX = (e.clientX / window.innerWidth - 0.5) * 2;
      rawY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMouseMove);

    let scrollProgress = 0;
    function readScroll() {
      const max = scene.scrollHeight - window.innerHeight;
      scrollProgress = clamp(window.scrollY / (max || 1), 0, 1);
    }

    // ── ArcCardSlider build ──
    let arcCfg = null;
    function buildArc() {
      arcRoot.innerHTML = '';
      const mob = isMobile();
      const spacing = mob ? 12 : 9;
      const arcRadius = mob ? 700 : 1100;
      const cardW = mob ? 160 : 220;
      const cardH = mob ? 175 : 230;
      const sliderH = mob ? 260 : 360;
      const centerIndex = Math.floor(CARDS.length / 2);
      const halfW = cardW / 2;

      const wrap = document.createElement('div');
      wrap.style.position = 'relative';
      wrap.style.width = '100%';
      wrap.style.height = sliderH + 'px';

      for (let i = 0; i < CARDS.length; i++) {
        const c = CARDS[i];
        const el = document.createElement('div');
        el.className = 'ph-arc-card';
        el.style.width = cardW + 'px';
        el.style.height = cardH + 'px';
        el.style.background = c.color;
        el.style.borderRadius = (mob ? 18 : 26) + 'px';
        el.style.padding = (mob ? 16 : 22) + 'px';
        el.setAttribute('data-i', String(i));
        el.setAttribute('data-base', String((i - centerIndex) * spacing));

        const num = document.createElement('div');
        num.className = 'ph-arc-num';
        num.textContent = ('0' + (i + 1)).slice(-2);
        el.appendChild(num);

        const body = document.createElement('div');
        body.style.marginTop = 'auto';
        const t = document.createElement('div');
        t.className = 'ph-arc-title';
        t.style.fontSize = (mob ? 22 : 30) + 'px';
        t.textContent = c.title;
        const d = document.createElement('div');
        d.className = 'ph-arc-desc';
        d.style.fontSize = (mob ? 12 : 15) + 'px';
        d.style.marginTop = '4px';
        d.textContent = c.desc;
        body.appendChild(t);
        body.appendChild(d);
        el.appendChild(body);

        wrap.appendChild(el);
      }
      arcRoot.appendChild(wrap);
      arcCfg = { spacing, arcRadius, cardW, halfW, centerIndex, mob };
    }

    function positionArc() {
      if (!arcCfg) return;
      const total = CARDS.length;
      const arcSweepDeg = (total - 1) * 10;
      const rotationOffset = lerp(0, arcSweepDeg, clamp((scrollProgress - 0.7) / 0.3, 0, 1));
      const cards = arcRoot.querySelectorAll('.ph-arc-card');
      const yOff = arcCfg.mob ? 140 : 200;
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        const baseDeg = parseFloat(el.getAttribute('data-base'));
        const deg = baseDeg - rotationOffset + (arcCfg.centerIndex * arcCfg.spacing);
        const rad = deg * Math.PI / 180;
        const x = Math.sin(rad) * arcCfg.arcRadius;
        const y = arcCfg.arcRadius - Math.cos(rad) * arcCfg.arcRadius;
        el.style.bottom = (-y + yOff) + 'px';
        el.style.left = 'calc(50% + ' + x + 'px - ' + arcCfg.halfW + 'px)';
        el.style.transform = 'rotate(' + deg + 'deg)';
        el.style.transformOrigin = arcCfg.halfW + 'px ' + arcCfg.arcRadius + 'px';
      }
    }

    // ── render loop ──
    let raf = 0;
    function render() {
      smX = lerp(smX, rawX, 0.07);
      smY = lerp(smY, rawY, 0.07);

      const sp = scrollProgress;
      const ep = easeInOut(sp);

      const worldScale = lerp(1, 1.18, ep);
      world.style.transform = 'translate(' + (-smX * MAG.world) + 'px,' + (-smY * MAG.world) + 'px) scale(' + worldScale + ')';

      const cloudsScale = lerp(1, 1.4, ep);
      const cloudsOp = clamp(0.7 + (sp / 0.05) * 0.3, 0.7, 1);
      clouds.style.transform = 'translate(' + (-smX * MAG.clouds) + 'px,' + (-smY * MAG.clouds * 0.4) + 'px) scale(' + cloudsScale + ')';
      clouds.style.opacity = cloudsOp;

      const portalScale = lerp(1, 4.0, ep);
      const portalOp = sp < 0.65 ? 1 : clamp(1 - (sp - 0.65) / 0.2, 0.35, 1);
      portal.style.transform = 'translate(' + (-smX * MAG.portal) + 'px,' + (-smY * MAG.portal) + 'px) scale(' + portalScale + ')';
      portal.style.opacity = portalOp;

      const entranceL = curtainsOpen ? -62 : 0;
      const entranceR = curtainsOpen ? 62 : 0;
      const curtainScale = lerp(1, 1.3, ep);
      const curtainTx = lerp(0, 150, ep);
      if (entranceDone) {
        curtainL.style.transform = 'translateX(' + (entranceL - curtainTx + (-smX * MAG.curtainL)) + '%) translateY(' + (-smY * MAG.curtainL * 0.3) + 'px) scale(' + curtainScale + ')';
        curtainR.style.transform = 'translateX(' + (entranceR + curtainTx + (-smX * MAG.curtainR)) + '%) translateY(' + (-smY * MAG.curtainR * 0.3) + 'px) scale(' + curtainScale + ')';
      } else {
        curtainL.style.transform = 'translateX(' + entranceL + '%)';
        curtainR.style.transform = 'translateX(' + entranceR + '%)';
      }

      const scene2Opacity = clamp((sp - 0.68) / 0.16, 0, 1);
      slider.style.opacity = scene2Opacity;
      scene2ui.style.opacity = scene2Opacity;

      const scene1Op = clamp(1 - sp / 0.22, 0, 1);
      scene1ui.style.opacity = scene1Op;

      positionArc();
      raf = requestAnimationFrame(render);
    }

    // ── reveals ──
    function fireReveals() {
      const els = viewport.querySelectorAll('.ph-reveal');
      for (let i = 0; i < els.length; i++) {
        (function (el) {
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          setTimeout(() => el.classList.add('show'), delay);
        })(els[i]);
      }
    }

    // ── entrance sequence ──
    const t1 = setTimeout(() => { curtainsOpen = true; }, 100);
    const t2 = setTimeout(fireReveals, 600);
    const t3 = setTimeout(() => { entranceDone = true; setCurtainTransition(false); }, 2200);

    buildArc();
    readScroll();

    function onScroll() { readScroll(); }
    function onResize() { buildArc(); readScroll(); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      arcCfg = null;
    };
  }, []);

  return (
    <div className="portal-hero">
      <div className="ph-scene" ref={sceneRef}>
        <div className="ph-viewport" ref={viewportRef}>

          {/* L1 world */}
          <div className="ph-layer" id="ph-world" ref={worldRef}>
            <img src="https://plugin-assets.open-design.ai/plugins/dreamcore-landing/image_2_gkcdlx-5f252f.webp" alt="world" />
          </div>

          {/* L2 clouds */}
          <div className="ph-layer" id="ph-clouds" ref={cloudsRef}>
            <img src="https://plugin-assets.open-design.ai/plugins/dreamcore-landing/bottom_clouds_xskut6-c56b42.webp" alt="clouds" />
          </div>

          {/* L2.5 arc slider */}
          <div id="ph-slider" ref={sliderRef}><div ref={arcRootRef}></div></div>

          {/* L3 portal */}
          <div className="ph-layer" id="ph-portal" ref={portalRef}>
            <img src="https://plugin-assets.open-design.ai/plugins/dreamcore-landing/image_1_vdzwae-464f73.webp" alt="portal" />
          </div>

          {/* L3.5 bottom fade */}
          <div id="ph-bottom-fade"></div>

          {/* L4 curtains */}
          <div className="ph-layer ph-curtain" id="ph-curtain-l" ref={curtainLRef}>
            <img src="https://plugin-assets.open-design.ai/plugins/dreamcore-landing/curtain_left_znkmva-f9eb4c.webp" alt="" />
          </div>
          <div className="ph-layer ph-curtain" id="ph-curtain-r" ref={curtainRRef}>
            <img src="https://plugin-assets.open-design.ai/plugins/dreamcore-landing/curtain_right_paeyym-9fa947.webp" alt="" />
          </div>

          {/* top fade */}
          <div id="ph-top-fade"></div>

          {/* NAV */}
          <nav className="ph-nav">
            <div className="ph-nav-mobile" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link className="ph-navlink" style={{ fontSize: '11px' }} to="/tools/bg-remove">Tools</Link>
              <BrandMark size={26} />
              <Link className="ph-navlink" style={{ fontSize: '11px' }} to="/tools/upscale">Free</Link>
            </div>
            <div className="ph-nav-desktop" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="ph-nav-group">
                <Link className="ph-navlink" to="/tools/bg-remove">Remove</Link>
                <Link className="ph-navlink" to="/tools/upscale">Upscale</Link>
                <a className="ph-navlink" href="#">Telegram</a>
              </div>
              <BrandMark size={26} />
              <div className="ph-nav-group">
                <Link className="ph-navlink" to="/tools/upscale">Free</Link>
                <a className="ph-navlink" href="#">Guides</a>
                <a className="ph-navlink" href="https://bondin.io/sycoishere" target="_blank" rel="noopener noreferrer">Support</a>
              </div>
            </div>
          </nav>

          {/* SCENE 1 UI */}
          <div id="ph-scene1-ui" ref={scene1UIRef}>
            {/* shared centered heading */}
            <div className="ph-s1-heading">
              <div className="ph-reveal" data-delay="300">
                <div className="ph-heading-serif ph-h-fall">REMOVE <span className="ph-gt">&rsaquo;</span> <span className="ph-italic">REFINE</span></div>
                <div className="ph-heading-serif ph-h-rev">INTELLIGENCE</div>
                <div className="ph-body-sans ph-sub">Free, unlimited, no signup. Upload any image — AI strips backgrounds and upscales edges to 4x in seconds.</div>
              </div>
            </div>

            {/* mobile tool cards — visible only on < 768px via CSS */}
            <div className="ph-s1-mobile">
              <div className="ph-reveal" data-delay="550" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <ReelCard href="/tools/bg-remove" image="/remove-bg.jpg">
                  <PlayRow label="Background Remover" />
                </ReelCard>
                <ReelCard href="/tools/upscale" image="/upscaler.jpg">
                  <PlayRow label="Upscaler" />
                </ReelCard>
              </div>
            </div>

            {/* tablet */}
            <div className="ph-s1-tablet">
              <div className="ph-reveal ph-tablet-cards" data-delay="550">
                <ReelCard href="/tools/bg-remove" image="/remove-bg.jpg">
                  <PlayRow label="Background Remover" />
                </ReelCard>
                <ReelCard href="/tools/upscale" image="/upscaler.jpg">
                  <PlayRow label="Upscaler" />
                </ReelCard>
              </div>
            </div>

            {/* desktop */}
            <div className="ph-s1-desktop">
              <div className="ph-reveal ph-s1-desk-cards" data-delay="550">
                <Link to="/tools/bg-remove" className="ph-reel-link">
                  <div className="ph-reel-card ph-desk-card" style={{ backgroundImage: "url('/remove-bg.jpg')" }}>
                    <div className="ph-card-grad"></div><div className="ph-card-blur"></div>
                    <div className="ph-card-content"><PlayRow dotSize={11} label="Background Remover" /></div>
                  </div>
                </Link>
                <Link to="/tools/upscale" className="ph-reel-link">
                  <div className="ph-reel-card ph-desk-card" style={{ backgroundImage: "url('/upscaler.jpg')" }}>
                    <div className="ph-card-grad"></div><div className="ph-card-blur"></div>
                    <div className="ph-card-content"><PlayRow dotSize={11} label="Upscaler" /></div>
                  </div>
                </Link>
              </div>
            </div>

            {/* slider dots */}
            <div className="ph-reveal" id="ph-dots" data-delay="800">
              <span className="ph-sdot first"></span><span className="ph-sdot"></span><span className="ph-sdot"></span><span className="ph-sdot"></span>
            </div>

            {/* scroll cue */}
            <div className="ph-reveal" id="ph-scroll-cue" data-delay="900">
              <span className="ph-descend">DESCEND</span>
              <span className="ph-chevron-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></span>
            </div>
          </div>

          {/* SCENE 2 UI */}
          <div id="ph-scene2-ui" ref={scene2UIRef}>
            <div className="ph-h2">FORGE THE IMPOSSIBLE</div>
            <div className="ph-sub2">Upload any image and let AI do the rest — background remover, 4x upscaler and more, all free, unlimited and finished in seconds.</div>
          </div>

        </div>
      </div>
    </div>
  );
}
