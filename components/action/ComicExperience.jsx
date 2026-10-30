'use client';

import { useEffect, useRef } from 'react';
import { mountScene } from '@/lib/action/scene-engine';
import './comic.css';

const scenes = [
  { id: 'study', title: 'STUDY MODE', detail: 'Nottingham → Penn' },
  { id: 'finance', title: 'FINANCE', detail: 'CICC · CITIC Futures · CGS' },
  { id: 'product', title: 'BYTEDANCE', detail: 'Product Manager', logo: 'tiktok.svg', alt: 'TikTok logo', logoClass: 'cs-tiktok' },
  { id: 'kitchen', title: 'KITCHEN SURVIVOR', detail: 'From idea to dinner.', logo: 'kitchensurvivor-icon.jpg', alt: 'KitchenSurvivor logo', logoClass: 'cs-logo' },
  { id: 'life', title: 'OFF THE CLOCK', detail: 'A few frames from my travels.' },
];

export default function ComicExperience({ wikiHtml }) {
  const rootRef = useRef(null);
  useEffect(() => mountScene(rootRef.current), []);

  return (
    <div id="colar-app" ref={rootRef} data-mode="fun" aria-label="Colar’s comic portfolio">
      <header className="ch-header">
        <nav aria-label="Find me online">
          <a href="https://github.com/wangxuzhou666-arch" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/xuzhou-wang/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://colar.workplay.pro/wiki/Colar_Wang/" target="_blank" rel="noopener noreferrer">ColaPedia ↗</a>
        </nav>
        <div className="cd-switch" role="group" aria-label="Choose Fun or Serious">
          <button type="button" data-mode-choice="fun" aria-pressed="true">FUN</button>
          <button type="button" data-mode-choice="serious" aria-pressed="false">SERIOUS</button>
        </div>
        <div className="cd-switch cd-sound" role="group" aria-label="Sound effects">
          <button type="button" data-sound aria-pressed="true">SOUND</button>
        </div>
      </header>

      <div className="cd-fun">
        <section className="ch-cover" aria-label="Meet my alter ego">
          <div className="ch-copy"><span>A WORK IN PROGRESS.</span><h1>COLAR<br /><em>IN ACTION.</em></h1><p>Curiosity. Unleashed.</p></div>
          <div className="ch-rays" aria-hidden="true" />
          <button className="ch-photo" type="button" aria-label="Click the photo to reveal my alter ego" aria-pressed="false">
            <span className="ch-photo-window">
              <img className="ch-photo-real" src="/action/assets/portrait.jpg" alt="A photo of Colar" draggable="false" width="204" height="228" />
              <span className="ch-photo-alter" aria-hidden="true"><canvas className="ch-photo-avatar" width="408" height="456" /></span>
            </span>
            <span>ALTER EGO ↗</span>
          </button>
        </section>
        <section className="ch-cards" aria-label="Hover to enter a scene, or tap on mobile">
          {scenes.map((scene, i) => (
            <button className={`ch-card ch-${scene.id}`} type="button" data-stage={i} aria-pressed="false" key={scene.id}>
              {/* 外层按钮是墨框，内层同形缩进一圈装画面：clip-path 会裁掉 border/outline，框只能这样画。 */}
              <span className="ch-panel">
                <canvas className="cs-scene" aria-hidden="true" />
                {scene.id === 'life' && <span className="ch-photo-description">Travel photos: northern lights over a snowy cabin, the Golden Gate Bridge, and a coastal waterfall.</span>}
                {scene.logo && <img className={scene.logoClass} src={`/action/assets/${scene.logo}`} alt={scene.alt} />}
                <span className="ch-caption"><strong>{scene.title}</strong><small>{scene.detail}</small></span>
              </span>
            </button>
          ))}
        </section>
      </div>

      <section className="cs-wiki" hidden aria-label="Original ColaPedia" dangerouslySetInnerHTML={{ __html: wikiHtml }} />
      <canvas className="ch-flight" aria-hidden="true" />
      <span className="ch-status" role="status" aria-live="polite" />
      <noscript><p>Enable JavaScript to play the scenes. <a href="https://colar.workplay.pro/wiki/Colar_Wang/">Read ColaPedia</a></p></noscript>
    </div>
  );
}
