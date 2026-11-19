// Controle do Vídeo de Fundo (Loop do 01:05 em diante em Repeat)
    const bgVideo = document.getElementById('heroBgVideo');
    const btnToggleMute = document.getElementById('btnToggleMute');
    const iconMute = document.getElementById('iconMute');
    const LOOP_START_SEC = 65; // 01:05 = 65 segundos

    if (bgVideo) {
      function seekToStartTime() {
        if (bgVideo.currentTime < LOOP_START_SEC) {
          bgVideo.currentTime = LOOP_START_SEC;
        }
        bgVideo.play().catch(() => {});
      }

      bgVideo.addEventListener('loadedmetadata', seekToStartTime);
      bgVideo.addEventListener('canplay', () => {
        if (bgVideo.currentTime < LOOP_START_SEC) {
          bgVideo.currentTime = LOOP_START_SEC;
        }
      });

      // Ao se aproximar do final ou terminar, volta em loop para 01:05
      bgVideo.addEventListener('timeupdate', () => {
        if (bgVideo.duration && bgVideo.currentTime >= bgVideo.duration - 0.25) {
          bgVideo.currentTime = LOOP_START_SEC;
          bgVideo.play().catch(() => {});
        }
      });

      bgVideo.addEventListener('ended', () => {
        bgVideo.currentTime = LOOP_START_SEC;
        bgVideo.play().catch(() => {});
      });

      if (bgVideo.readyState >= 1) {
        seekToStartTime();
      }
    }

    if (btnToggleMute && bgVideo) {
      btnToggleMute.addEventListener('click', () => {
        bgVideo.muted = !bgVideo.muted;
        if (bgVideo.muted) {
          iconMute.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
          btnToggleMute.setAttribute('title', 'Ativar Áudio');
        } else {
          iconMute.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
          btnToggleMute.setAttribute('title', 'Desativar Áudio');
        }
      });
    }

    // Controle dos Vídeos dos Diferenciais (Praia & Ofídios) - Sem Player e 100% em Repeat Contínuo
    function setupSeamlessLoopVideos() {
      const differentialVids = [
        document.getElementById('videoPlayerAfogados'),
        document.getElementById('videoPlayerOfideos')
      ];

      differentialVids.forEach(vid => {
        if (!vid) return;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.removeAttribute('controls');

        // Disparo de reprodução automática sem controles
        const tryPlay = () => {
          vid.play().catch(() => {
            // Em navegadores móveis com restrição agressiva, inicia no primeiro gesto
            const onUserGesture = () => {
              vid.play().catch(() => {});
              window.removeEventListener('touchstart', onUserGesture);
              window.removeEventListener('scroll', onUserGesture);
            };
            window.addEventListener('touchstart', onUserGesture, { passive: true, once: true });
            window.addEventListener('scroll', onUserGesture, { passive: true, once: true });
          });
        };

        tryPlay();

        // Loop contínuo infalível (reinicia imediatamente se chegar ao fim)
        vid.addEventListener('ended', () => {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        });

        // Se pausar inesperadamente, retoma
        vid.addEventListener('pause', () => {
          if (!document.hidden) {
            vid.play().catch(() => {});
          }
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupSeamlessLoopVideos);
    } else {
      setupSeamlessLoopVideos();
    }

    // Controle de Modais
    function openModal(modalId) {
      const el = document.getElementById(modalId);
      if (el) el.classList.add('active');
    }

    function closeModal(modalId) {
      const el = document.getElementById(modalId);
      if (el) el.classList.remove('active');
    }

    function openCourseDetailsModal(courseType) {
      if (courseType === 'bombeiro') {
        openModal('modalCourseBombeiro');
      } else {
        openModal('modalCourseSocorrista');
      }
    }

    // Dados das Pistas Táticas
    const LABS_DATA = {
      1: {
        code: 'PISTA 01 • COMBATE A INCÊNDIO',
        title: 'Casa de Fumaça & Contêiner Flashover',
        desc: 'Ambiente controlado projetado com termopares e sensores para treinamento seguro de combate ao fogo real, propagação térmica e ventilação tática.',
        specs: 'Combustível seguro e certificado, gerador de fumaça não-tóxica, linhas de ataque com esguicho regulável de alta vazão, EPI completo NBR 14608.'
      },
      2: {
        code: 'CÉLULA 02 • TRAUMA & SBV',
        title: 'Laboratório de Simulação Pré-Hospitalar',
        desc: 'Célula de alta fidelidade clínica para protocolos de suporte básico e avançado à vida, atendimento ao politraumatizado e aplicação de torniquetes.',
        specs: 'Manequins de alta fidelidade com retorno de qualidade de compressão (QCPR), DEA bifásico de instrução, kits de imobilização KED e prancha rígida.'
      },
      3: {
        code: 'TORRE 03 • ALTURAS (NR-35)',
        title: 'Torre de Salvamento em Alturas & Rapel',
        desc: 'Estrutura vertical metálica de padrão militar com ancoragens triplas para descidas em rapel, resgate de vítimas conscientes e inconscientes e içamento.',
        specs: 'Pontos de ancoragem certificados para 22kN, freios tipo oito e descensores autoblocantes, cintos paraquedista e trava-quedas certificados.'
      },
      4: {
        code: 'MÓDULO 04 • CONFINADO (NR-33)',
        title: 'Simulador de Espaço Confinado & Galerias',
        desc: 'Labirinto escuro modular com dutos e passagens estreitas para treinamento de resgate em tanques, silos e galerias com equipamento de ar mandado.',
        specs: 'Equipamentos autônomos de respiração (SCBA) em fibra de carbono 300 bar, detectores multigás (O2, CO, H2S, LEL) e tripé de resgate com guincho.'
      },
      5: {
        code: 'AMBULÂNCIA • RESGATE MÓVEL',
        title: 'Módulo de Atendimento em Trânsito',
        desc: 'Célula que simula a instabilidade de uma ambulância em trânsito com regulação médica por rádio, estabilização dinâmica e monitoramento contínuo.',
        specs: 'Maca retrátil articulada, oxigenoterapia móvel, aspirador de secreções, rádio comunicador VHF e kits de vias aéreas.'
      },
      6: {
        code: 'CENTRO 06 • COMANDO & BRIEFING',
        title: 'Sala de Comando de Incidentes (SCI)',
        desc: 'Centro tático para planejamento de ocorrências complexas, divisão de setores operacionais e gestão de recursos em grandes sinistros.',
        specs: 'Quadros de comando operacional, mapas cartográficos táticos, protocolos de triagem em massa START e estações de comunicação integrada.'
      }
    };

    function openLabModal(labId) {
      const data = LABS_DATA[labId];
      if (!data) return;
      document.getElementById('modalLabCode').textContent = data.code;
      document.getElementById('modalLabTitle').textContent = data.title;
      document.getElementById('modalLabDesc').textContent = data.desc;
      document.getElementById('modalLabSpecs').textContent = data.specs;
      openModal('modalLabDetails');
    }

    /* =====================================================================
       CONTROLADOR DA NAVEGAÇÃO CORPORATIVA & GAVETA MOBILE (ANRC NAV v3.0)
       ===================================================================== */
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const btnToggleMobile = document.getElementById('btnToggleMobileMenu');
    const btnCloseMobile = document.getElementById('btnMobileNavClose');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');
    const siteHeader = document.getElementById('headerNav');

    function openMobileNav() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (btnToggleMobile) {
        btnToggleMobile.classList.add('is-active');
        btnToggleMobile.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (btnToggleMobile) {
        btnToggleMobile.classList.remove('is-active');
        btnToggleMobile.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }

    if (btnToggleMobile) {
      btnToggleMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (btnCloseMobile) {
      btnCloseMobile.addEventListener('click', closeMobileNav);
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileNav);
    }

    // Fechar gaveta ao clicar em qualquer link de navegação interno
    const drawerLinks = mobileDrawer ? mobileDrawer.querySelectorAll('a[href^="#"]') : [];
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Fechar ao clicar no backdrop escuro de modais comuns
    document.querySelectorAll('.modal-backdrop-layer').forEach(layer => {
      layer.addEventListener('click', (e) => {
        if (e.target === layer) {
          closeModal(layer.id);
        }
      });
    });

    // Fechar com tecla ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
        document.querySelectorAll('.modal-backdrop-layer').forEach(layer => {
          closeModal(layer.id);
        });
      }
    });

    // SCROLLSPY INTELIGENTE & ESTILO DE CABEÇALHO AO ROLAR
    const trackedSectionIds = [
      'inicio',
      'teste-vocacional',
      'cursos',
      'diferenciais',
      'mercado-trabalho',
      'quem-somos',
      'servicos',
      'depoimentos',
      'contato'
    ];

    function handleNavbarScrollAndSpy() {
      const scrollPos = window.scrollY || window.pageYOffset;

      // Estilo compacto do cabeçalho
      if (siteHeader) {
        if (scrollPos > 30) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      // Scrollspy de seções
      let currentSectionId = '';
      for (let i = 0; i < trackedSectionIds.length; i++) {
        const secId = trackedSectionIds[i];
        const secEl = document.getElementById(secId);
        if (secEl) {
          const top = secEl.offsetTop - 120;
          const height = secEl.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = secId;
          }
        }
      }

      // Se estiver no topo
      if (scrollPos < 100) {
        currentSectionId = 'inicio';
      }

      if (currentSectionId) {
        // Atualiza Desktop
        document.querySelectorAll('#desktopNavMenu .nav-link-item a').forEach(a => {
          if (a.getAttribute('href') === `#${currentSectionId}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });

        // Atualiza Mobile Drawer
        document.querySelectorAll('#mobileNavLinksList .mobile-nav-item a').forEach(a => {
          if (a.getAttribute('href') === `#${currentSectionId}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', handleNavbarScrollAndSpy, { passive: true });
    handleNavbarScrollAndSpy();

    /* =====================================================================
       MOTOR DO QUIZ INTERATIVO EMBUTIDO (ANRC TELEMETRY ENGINE v2.6)
       ===================================================================== */
    const IQ_QUESTIONS = [
      // Bloco A - Bombeiro Civil
      { id: 1, block: 'A', text: "Tenho facilidade para manter o controle emocional e tomar decisões rápidas sob extrema pressão.", justification: "Alta resiliência emocional e agilidade na tomada de decisões sob estresse operacional." },
      { id: 2, block: 'A', text: "Sinto-me confortável para atuar em ambientes de risco elevado, como alturas, espaços confinados ou locais com visibilidade reduzida.", justification: "Segurança e determinação em cenários verticais, confinados e baixa visibilidade." },
      { id: 3, block: 'A', text: "Tenho boa resistência física e me disponho a realizar atividades que exigem grande esforço físico contínuo.", justification: "Resistência e preparo para operações físicas contínuas de resgate." },
      { id: 4, block: 'A', text: "Gosto de seguir protocolos rigorosos de segurança e fiscalizar o cumprimento de normas para evitar acidentes.", justification: "Rigor exemplar no cumprimento de normas técnicas e fiscalização preventiva." },
      { id: 5, block: 'A', text: "Agiria com determinação e foco imediato ao enfrentar situações com fogo, produtos perigosos ou necessidade de combate a incêndio.", justification: "Firmeza e coragem no enfrentamento a chamas e controle de sinistros." },
      { id: 6, block: 'A', text: "Prefiro atividades predominantemente práticas, operacionais e de prontidão em relação a rotinas puramente administrativas.", justification: "Foco e dinamismo operacional em atividades práticas de campo." },
      // Bloco B - Técnico Socorrista
      { id: 7, block: 'B', text: "Consigo manter a calma e a empatia ao lidar diretamente com pessoas feridas, em pânico ou em sofrimento físico grave.", justification: "Firmeza e sensibilidade humanizada no manejo de vítimas em sofrimento crítico." },
      { id: 8, block: 'B', text: "Tenho facilidade para aprender e executar procedimentos técnicos minuciosos, como imobilização, triagem de vítimas e aferição de sinais vitais.", justification: "Destreza e precisão para protocolos de imobilização e monitoramento vital." },
      { id: 9, block: 'B', text: "Tenho estômago forte para lidar com sangue, ferimentos graves e situações anatomicamente impactantes sem perder a concentração.", justification: "Firmeza emocional diante de traumas severos e urgências clínicas graves." },
      { id: 10, block: 'B', text: "Consigo me comunicar com clareza e agilidade ao transmitir dados do paciente para médicos ou equipes hospitalares.", justification: "Comunicação ágil e técnica com equipes médicas e regulação hospitalar." },
      { id: 11, block: 'B', text: "Sinto satisfação em prestar atendimento humanizado e focado no cuidado contínuo da vida em trânsito ou ambulância.", justification: "Vocação para o cuidado contínuo e suporte dinâmico em ambulâncias." },
      { id: 12, block: 'B', text: "Tenho alta capacidade de adaptação para trabalhar em cenários dinâmicos e imprevistos na rua ou em domicílios.", justification: "Alta adaptabilidade em ocorrências dinâmicas em vias públicas e domicílios." }
    ];

    let iqCurrentIdx = 0;
    const iqAnswers = Array(12).fill(null);
    let iqAudioCtx = null;

    function playIqBeep(freq = 700, duration = 0.08) {
      try {
        if (!iqAudioCtx) {
          iqAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (iqAudioCtx.state === 'suspended') {
          iqAudioCtx.resume();
        }
        const osc = iqAudioCtx.createOscillator();
        const gain = iqAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, iqAudioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, iqAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, iqAudioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(iqAudioCtx.destination);
        osc.start();
        osc.stop(iqAudioCtx.currentTime + duration);
      } catch (e) {}
    }

    function showIqView(viewId) {
      const views = ['iqViewIntro', 'iqViewQuiz', 'iqViewLead', 'iqViewAnalyzing', 'iqViewResult'];
      views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.classList.remove('active');
      });
      const target = document.getElementById(viewId);
      if (target) target.classList.add('active');
    }

    function renderIqQuestion() {
      const q = IQ_QUESTIONS[iqCurrentIdx];
      const percent = Math.round(((iqCurrentIdx + 1) / 12) * 100);

      document.getElementById('iqBlockPhaseLabel').textContent = q.block === 'A' 
        ? 'FASE 01 • MAPEAMENTO DE PERFIL' 
        : 'FASE 02 • MAPEAMENTO DE PERFIL';
      
      document.getElementById('iqProgressPercentLabel').textContent = `AFIRMAÇÃO ${iqCurrentIdx + 1} DE 12 – ${percent}%`;
      document.getElementById('iqProgressBar').style.width = `${percent}%`;
      document.getElementById('iqStatementNumberBadge').textContent = `AFIRMAÇÃO ${String(iqCurrentIdx + 1).padStart(2, '0')} DE 12`;
      document.getElementById('iqStatementText').textContent = q.text;

      const prevAnswer = iqAnswers[iqCurrentIdx];
      const likertBtns = document.querySelectorAll('.iq-likert-btn');
      likertBtns.forEach(btn => {
        const val = parseInt(btn.dataset.val, 10);
        if (val === prevAnswer) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
      });

      document.getElementById('iqBtnPrev').disabled = (iqCurrentIdx === 0);
      document.getElementById('iqBtnNext').disabled = (prevAnswer === null);

      if (iqCurrentIdx === 11) {
        document.getElementById('iqBtnNext').innerHTML = '<span>Finalizar Perguntas</span> <span>➔</span>';
      } else {
        document.getElementById('iqBtnNext').innerHTML = '<span>Próxima Pergunta</span> <span>➔</span>';
      }
    }

    function advanceIqQuestion() {
      if (iqAnswers[iqCurrentIdx] === null) return;
      if (iqCurrentIdx < 11) {
        iqCurrentIdx++;
        playIqBeep(750, 0.08);
        renderIqQuestion();
      } else {
        playIqBeep(900, 0.12);
        showIqView('iqViewLead');
      }
    }

    // Iniciar Quiz
    document.getElementById('iqBtnStart').addEventListener('click', () => {
      playIqBeep(800, 0.1);
      iqCurrentIdx = 0;
      renderIqQuestion();
      showIqView('iqViewQuiz');
    });

    // Likert Clicks
    document.querySelectorAll('.iq-likert-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.val, 10);
        iqAnswers[iqCurrentIdx] = val;
        document.querySelectorAll('.iq-likert-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('iqBtnNext').disabled = false;
        playIqBeep(650 + val * 60, 0.08);

        setTimeout(() => {
          advanceIqQuestion();
        }, 280);
      });
    });

    document.getElementById('iqBtnNext').addEventListener('click', () => {
      advanceIqQuestion();
    });

    document.getElementById('iqBtnPrev').addEventListener('click', () => {
      if (iqCurrentIdx > 0) {
        iqCurrentIdx--;
        playIqBeep(550, 0.06);
        renderIqQuestion();
      }
    });

    // Máscara de Telefone do Lead
    const iqInputPhone = document.getElementById('iqInputPhone');
    if (iqInputPhone) {
      iqInputPhone.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
          v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
          v = `(${v.slice(0,2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
          v = `(${v}`;
        }
        e.target.value = v;
      });
    }

    // Submissão do Lead e Cálculo Determinístico
    document.getElementById('iqBtnSubmitLead').addEventListener('click', () => {
      const nameInput = document.getElementById('iqInputName');
      const phoneInput = document.getElementById('iqInputPhone');
      const errName = document.getElementById('iqErrName');
      const errPhone = document.getElementById('iqErrPhone');

      const nameVal = nameInput.value.trim();
      const phoneVal = phoneInput.value.replace(/\D/g, '');

      let isValid = true;
      if (nameVal.length < 3) {
        errName.style.display = 'block';
        isValid = false;
      } else {
        errName.style.display = 'none';
      }

      if (phoneVal.length < 10) {
        errPhone.style.display = 'block';
        isValid = false;
      } else {
        errPhone.style.display = 'none';
      }

      if (!isValid) return;

      // Mostra tela de análise
      showIqView('iqViewAnalyzing');
      playIqBeep(850, 0.1);

      // Simula análise rápida e calcula
      setTimeout(() => {
        calculateAndRenderIqResult(nameVal, phoneInput.value);
      }, 1500);
    });

    function calculateAndRenderIqResult(candidateName, candidatePhone) {
      // Cálculo das Médias
      const sumA = iqAnswers.slice(0, 6).reduce((acc, v) => acc + (v || 3), 0);
      const meanA = sumA / 6.0;

      const sumB = iqAnswers.slice(6, 12).reduce((acc, v) => acc + (v || 3), 0);
      const meanB = sumB / 6.0;

      const diff = Math.abs(meanA - meanB);

      let classification = '';
      let title = '';
      let themeColor = '';
      let descText = '';

      if (meanA >= 4.0 && meanB >= 4.0 && diff < 0.5) {
        classification = 'MISTO';
        title = 'PERFIL MISTO (DUPLA FORMAÇÃO)';
        themeColor = '#facc15';
        descText = `Sensacional, ${candidateName}! Você obteve excelente aptidão tanto na dimensão operacional quanto na dimensão clínica. Seu perfil é altamente recomendado para a formação integrada dupla (Bombeiro Civil + Socorrista APH).`;
      } else if (diff < 0.5) {
        classification = 'EQUILIBRADO';
        title = 'PERFIL EQUILIBRADO';
        themeColor = '#e2e8f0';
        descText = `Olá, ${candidateName}. Suas respostas demonstraram equilíbrio entre as competências táticas e o atendimento em saúde. Recomendamos conhecer a estrutura prática de ambas as especializações da ANRC.`;
      } else if (meanA > meanB) {
        classification = 'BOMBEIRO';
        title = 'BOMBEIRO CIVIL PROFISSIONAL';
        themeColor = 'var(--red-primary)';
        descText = `Parabéns, ${candidateName}! Seu mapeamento indicou vocação natural para atuação operacional, combate a incêndios, liderança tática sob estresse e resgate em ambientes de risco elevado.`;
      } else {
        classification = 'SOCORRISTA';
        title = 'TÉCNICO SOCORRISTA (APH)';
        themeColor = '#38bdf8';
        descText = `Excelente, ${candidateName}! Seu perfil evidenciou destreza, calma e preparo emocional para o suporte básico e avançado à vida, atendimento ao trauma e estabilização de vítimas.`;
      }

      // Justificativas qualitativas (respostas 4 ou 5)
      const justItems = [];
      iqAnswers.forEach((ans, idx) => {
        if (ans >= 4 && IQ_QUESTIONS[idx]) {
          justItems.push(IQ_QUESTIONS[idx].justification);
        }
      });
      const selectedJust = justItems.slice(0, 3);
      if (selectedJust.length === 0) {
        selectedJust.push("Perfil dinâmico com grande capacidade de aprendizagem prática nas instalações da ANRC.");
      }

      // Preenchimento dos Elementos
      document.getElementById('iqResCandidateTag').textContent = `CANDIDATO(A): ${candidateName.toUpperCase()}`;
      document.getElementById('iqResTitleHeadline').textContent = title;
      document.getElementById('iqResTitleHeadline').style.color = themeColor;

      document.getElementById('iqResDescText').textContent = descText;
      document.getElementById('iqResJustificationsList').innerHTML = selectedJust.map(j => `<li>${j}</li>`).join('');

      // WhatsApp URL
      const whatsappClean = '5584988934945';
      const msg = `Olá! Realizei o Questionário de Mapeamento Vocacional no site da ANRC.
*Candidato(a):* ${candidateName}
*Curso Indicado:* ${title}

Gostaria de garantir minha vaga com a condição especial de R$ 1.000,00!`;

      document.getElementById('iqBtnWhatsappConversion').href = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(msg)}`;

      // Salva referência para matrícula direta
      window.lastQuizResult = {
        name: candidateName,
        phone: candidatePhone,
        course: (classification === 'SOCORRISTA') ? 'Socorrista APH' : ((classification === 'MISTO') ? 'Combo Bombeiro + Socorrista' : 'Bombeiro Civil'),
        price: (classification === 'MISTO') ? 1800 : 1000
      };

      const btnEnrollText = document.getElementById('iqBtnEnrollText');
      if (btnEnrollText) {
        btnEnrollText.textContent = `MATRICULAR-SE EM ${window.lastQuizResult.course.toUpperCase()} (R$ ${window.lastQuizResult.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
      }

      showIqView('iqViewResult');
    }

    function enrollFromQuizResult() {
      if (window.lastQuizResult) {
        openCheckoutModal(window.lastQuizResult.course);
        const nameInput = document.getElementById('regNome');
        const phoneInput = document.getElementById('regWhatsApp');
        if (nameInput && window.lastQuizResult.name) nameInput.value = window.lastQuizResult.name;
        if (phoneInput && window.lastQuizResult.phone) phoneInput.value = window.lastQuizResult.phone;
      } else {
        openCheckoutModal('Bombeiro Civil');
      }
    }

    // Reiniciar Quiz
    document.getElementById('iqBtnRestart').addEventListener('click', () => {
      iqAnswers.fill(null);
      iqCurrentIdx = 0;
      document.getElementById('iqInputName').value = '';
      document.getElementById('iqInputPhone').value = '';
      showIqView('iqViewIntro');
    });

    /* =========================================================================
       SISTEMA DE CARRINHO & CHECKOUT MODAL DE MATRÍCULA (DÉBITO, CRÉDITO E PIX)
       ========================================================================= */

    let selectedCourse = 'Bombeiro Civil';
    let selectedCoursePrice = 1000;
    let selectedShift = 'Sábados (08h às 17h)';
    let currentPaymentMethod = 'PIX';

    function openCheckoutModal(courseName) {
      const modal = document.getElementById('modalCheckoutCart');
      if (!modal) return;
      if (courseName) {
        selectCourseInCart(courseName);
      } else {
        selectCourseInCart(selectedCourse || 'Bombeiro Civil');
      }
      modal.classList.add('active');
      const nomeInput = document.getElementById('regNome');
      if (nomeInput) setTimeout(() => nomeInput.focus(), 150);
    }

    function closeCheckoutModal() {
      const modal = document.getElementById('modalCheckoutCart');
      if (modal) modal.classList.remove('active');
    }

    function selectCourseInCart(courseName) {
      const optBombeiro = document.getElementById('optCartBombeiro');
      const optSocorrista = document.getElementById('optCartSocorrista');
      const optCombo = document.getElementById('optCartCombo');

      [optBombeiro, optSocorrista, optCombo].forEach(el => {
        if (el) el.classList.remove('active', 'socorrista-card', 'combo-card');
      });

      if (courseName && courseName.includes('Combo')) {
        selectedCourse = 'Combo Bombeiro + Socorrista';
        selectedCoursePrice = 1800;
        if (optCombo) optCombo.classList.add('active', 'combo-card');
        document.getElementById('modalCartTotalVal').textContent = 'R$ 1.800,00';
        document.getElementById('modalCartParcelasSub').textContent = 'ou em até 12x de R$ 150,00 sem juros no cartão';
        updateCreditCardInstallments(1800);
      } else if (courseName && courseName.includes('Socorrista')) {
        const p = typeof getCoursePrice === 'function' ? getCoursePrice('socorrista') : 1000;
        selectedCourse = 'Socorrista APH';
        selectedCoursePrice = p;
        if (optSocorrista) optSocorrista.classList.add('active', 'socorrista-card');
        document.getElementById('modalCartTotalVal').textContent = p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('modalCartParcelasSub').textContent = `ou em até 12x de ${(p / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros no cartão`;
        updateCreditCardInstallments(p);
      } else {
        const p = typeof getCoursePrice === 'function' ? getCoursePrice('bombeiro') : 1000;
        selectedCourse = 'Bombeiro Civil';
        selectedCoursePrice = p;
        if (optBombeiro) optBombeiro.classList.add('active');
        document.getElementById('modalCartTotalVal').textContent = p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('modalCartParcelasSub').textContent = `ou em até 12x de ${(p / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros no cartão`;
        updateCreditCardInstallments(p);
      }

      updateSubmitBtnLabel();
    }

    function selectShiftInCart(shiftName) {
      selectedShift = shiftName;
      const pills = [
        document.getElementById('shiftPillSabado'),
        document.getElementById('shiftPillDomingo'),
        document.getElementById('shiftPillNoturno')
      ];
      pills.forEach(p => { if (p) p.classList.remove('active'); });

      if (shiftName.includes('Sábado')) {
        if (document.getElementById('shiftPillSabado')) document.getElementById('shiftPillSabado').classList.add('active');
      } else if (shiftName.includes('Domingo')) {
        if (document.getElementById('shiftPillDomingo')) document.getElementById('shiftPillDomingo').classList.add('active');
      } else {
        if (document.getElementById('shiftPillNoturno')) document.getElementById('shiftPillNoturno').classList.add('active');
      }
    }

    function switchCartPayment(method) {
      currentPaymentMethod = method;
      const tabs = [
        { id: 'tabBtnPix', panel: 'panelPayPix', m: 'PIX' },
        { id: 'tabBtnCredito', panel: 'panelPayCredito', m: 'CREDITO' },
        { id: 'tabBtnDebito', panel: 'panelPayDebito', m: 'DEBITO' }
      ];

      tabs.forEach(t => {
        const btn = document.getElementById(t.id);
        const pnl = document.getElementById(t.panel);
        if (btn) btn.classList.remove('active');
        if (pnl) pnl.classList.remove('active');
      });

      const activeTab = tabs.find(t => t.m === method) || tabs[0];
      const activeBtn = document.getElementById(activeTab.id);
      const activePnl = document.getElementById(activeTab.panel);
      if (activeBtn) activeBtn.classList.add('active');
      if (activePnl) activePnl.classList.add('active');

      updateSubmitBtnLabel();
    }

    function updateSubmitBtnLabel() {
      const priceFmt = `R$ ${selectedCoursePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      const btnText = document.getElementById('btnCartSubmitLabel');
      if (!btnText) return;

      if (currentPaymentMethod === 'PIX') {
        btnText.textContent = `PAGAR VIA PIX (${priceFmt})`;
      } else if (currentPaymentMethod === 'CREDITO') {
        btnText.textContent = `PAGAR NO CRÉDITO (${priceFmt})`;
      } else {
        btnText.textContent = `PAGAR NO DÉBITO (${priceFmt})`;
      }
    }

    function updateCreditCardInstallments(val) {
      const select = document.getElementById('ccParcelas');
      if (!select) return;
      select.innerHTML = `
        <option value="1">1x de R$ ${(val).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="2">2x de R$ ${(val / 2).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="3">3x de R$ ${(val / 3).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="4">4x de R$ ${(val / 4).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="6">6x de R$ ${(val / 6).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="10">10x de R$ ${(val / 10).toFixed(2).replace('.', ',')} sem juros</option>
        <option value="12" selected>12x de R$ ${(val / 12).toFixed(2).replace('.', ',')} sem juros (Super Facilitado)</option>
      `;
    }

    function copyPixCode() {
      const pixInput = document.getElementById('pixCodeText');
      if (pixInput) {
        pixInput.select();
        navigator.clipboard.writeText(pixInput.value).then(() => {
          const msg = document.getElementById('pixCopiedMsg');
          if (msg) {
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 3000);
          }
        }).catch(() => {
          const msg = document.getElementById('pixCopiedMsg');
          if (msg) {
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 3000);
          }
        });
      }
    }

    // Máscaras de Input (CPF, Telefone, Cartão)
    function applyCpfMask(el) {
      if (!el) return;
      el.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
      });
    }

    function applyPhoneMask(el) {
      if (!el) return;
      el.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = v;
      });
    }

    applyCpfMask(document.getElementById('regCpf'));
    applyCpfMask(document.getElementById('manualCpf'));
    applyCpfMask(document.getElementById('editStudentCpf'));

    applyPhoneMask(document.getElementById('regWhatsApp'));
    applyPhoneMask(document.getElementById('manualPhone'));
    applyPhoneMask(document.getElementById('editStudentPhone'));

    function getStoredEnrollments() {
      try {
        const raw = localStorage.getItem('ANRC_MATRICULAS');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}

      const seed = [
        {
          protocol: 'MAT-2026-4402',
          date: '12/11/2026 09:45',
          name: 'Beatriz Almeida Santos',
          cpf: '234.567.890-44',
          phone: '(11) 98112-7788',
          email: 'beatriz.almeida@gmail.com',
          birth: '2000-08-30',
          shirt: 'P',
          course: 'Socorrista APH',
          shift: 'Sábados (08h às 17h)',
          paymentMethod: 'DEBITO',
          amount: 1000,
          status: 'Confirmada'
        },
        {
          protocol: 'MAT-2026-4401',
          date: '11/11/2026 11:20',
          name: 'Marcos Vinícius Costa',
          cpf: '678.901.234-55',
          phone: '(11) 99455-1234',
          email: 'marcos.v@yahoo.com.br',
          birth: '1997-04-18',
          shirt: 'M',
          course: 'Bombeiro Civil',
          shift: 'Sábados (08h às 17h)',
          paymentMethod: 'CREDITO',
          amount: 1000,
          status: 'Confirmada'
        }
      ];
      localStorage.setItem('ANRC_MATRICULAS', JSON.stringify(seed));
      return seed;
    }

    // Modal de Sucesso / Recibo
    function openSuccessReceiptModal(student) {
      const modal = document.getElementById('modalEnrollmentSuccess');
      if (!modal) return;

      document.getElementById('succProtocol').textContent = student.protocol;
      document.getElementById('succName').textContent = student.name;
      document.getElementById('succCourse').textContent = student.course;
      document.getElementById('succShift').textContent = student.shift;
      document.getElementById('succPayment').textContent = `${student.paymentMethod} (R$ ${student.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
      document.getElementById('succShirt').textContent = `Tamanho ${student.shirt} (Kit Aluno Grátis)`;
      const whatsClean = '5584988934945';
      const msg = `🚨 *COMPROVANTE OFICIAL DE MATRÍCULA • ANRC*\n*Protocolo:* ${student.protocol}\n*Aluno(a):* ${student.name}\n*CPF:* ${student.cpf}\n*Especialização:* ${student.course}\n*Turno:* ${student.shift}\n*Tamanho Camiseta:* ${student.shirt}\n*Pagamento:* ${student.paymentMethod} (R$ ${student.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})\n\nGostaria de confirmar minha inscrição e retirar meu fardamento na aula inaugural!`;
      window.open(`https://wa.me/${whatsClean}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }

    function updateAdminTelemetryClock() {
      const clock = document.getElementById('adminLiveTelemetryClock');
      if (!clock) return;
      const now = new Date();
      clock.textContent = `${now.toLocaleDateString('pt-BR')} • ${now.toLocaleTimeString('pt-BR')}`;
    }

    function renderAdminTable() {
      updateAdminTelemetryClock();
      const list = getStoredEnrollments();
      const search = (document.getElementById('adminSearchInput').value || '').toLowerCase().trim();
      const filterCourse = document.getElementById('adminFilterCourse').value;
      const filterPayment = document.getElementById('adminFilterPayment').value;
      const filterStatus = (document.getElementById('adminFilterStatus') ? document.getElementById('adminFilterStatus').value : 'ALL');
      const sortOrder = (document.getElementById('adminSortOrder') ? document.getElementById('adminSortOrder').value : 'NEWEST');

      let totalRev = 0, fireCount = 0, aphCount = 0, comboCount = 0;
      list.forEach(item => {
        totalRev += (item.amount || 0);
        if (item.course && item.course.includes('Bombeiro') && !item.course.includes('Combo')) fireCount++;
        else if (item.course && item.course.includes('Socorrista') && !item.course.includes('Combo')) aphCount++;
        else if (item.course && item.course.includes('Combo')) comboCount++;
      });

      document.getElementById('kpiTotalEnrollments').textContent = list.length;
      document.getElementById('kpiTotalRevenue').textContent = `R$ ${totalRev.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      document.getElementById('kpiFireCount').textContent = fireCount;
      document.getElementById('kpiAphCount').textContent = aphCount;
      document.getElementById('kpiComboCount').textContent = comboCount;
      const badgeStudentsCount = document.getElementById('tabBadgeStudentsCount');
      if (badgeStudentsCount) badgeStudentsCount.textContent = list.length;

      let filtered = list.filter(item => {
        const matchSearch = !search ||
          (item.name && item.name.toLowerCase().includes(search)) ||
          (item.cpf && item.cpf.toLowerCase().includes(search)) ||
          (item.phone && item.phone.toLowerCase().includes(search)) ||
          (item.protocol && item.protocol.toLowerCase().includes(search)) ||
          (item.email && item.email.toLowerCase().includes(search));
        const matchCourse = filterCourse === 'ALL' || (item.course && item.course.includes(filterCourse));
        const matchPay = filterPayment === 'ALL' || item.paymentMethod === filterPayment;
        const matchStatus = filterStatus === 'ALL' || (item.status && item.status.toLowerCase().includes(filterStatus.toLowerCase()));
        return matchSearch && matchCourse && matchPay && matchStatus;
      });
      if (sortOrder === 'NEWEST') filtered.reverse();
      else if (sortOrder === 'NAME_ASC') filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      else if (sortOrder === 'VAL_DESC') filtered.sort((a, b) => (b.amount || 0) - (a.amount || 0));

      document.getElementById('adminTableCountLabel').textContent = `● Exibindo ${filtered.length} de ${list.length} alunos`;
      const tbody = document.getElementById('adminStudentsTableBody');
      if (!tbody) return;
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 48px 20px; color: #64748b; font-family: var(--font-body);"><strong style="color: #94a3b8; font-size: 13px;">Nenhum aluno localizado</strong><div style="font-size: 12px; margin-top: 4px;">Refine os termos da busca ou limpe os filtros para restaurar a lista.</div></td></tr>`;
        return;
      }
      tbody.innerHTML = filtered.map((item) => {
        const cleanPhone = (item.phone || '').replace(/\D/g, '');
        const whatsLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${item.name}, aqui é da Coordenação de Ensino da ANRC referente à sua matrícula (${item.protocol}). Como podemos ajudar?`)}`;
        const parts = (item.name || 'Aluno').trim().split(/\s+/);
        const initials = ((parts[0] ? parts[0][0] : 'A') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
        let courseBadgeClass = 'table-badge-fire';
        if (item.course && item.course.includes('Socorrista') && !item.course.includes('Combo')) courseBadgeClass = 'table-badge-aph';
        else if (item.course && item.course.includes('Combo')) courseBadgeClass = 'table-badge-combo';
        const payClass = (item.paymentMethod || 'PIX').toUpperCase() === 'CREDITO' ? 'table-badge-credit' : (item.paymentMethod || 'PIX').toUpperCase() === 'DEBITO' ? 'table-badge-debit' : 'table-badge-pix';
        return `<tr><td><span class="protocol-cell-badge">${item.protocol || '-'}</span></td><td style="font-variant-numeric:tabular-nums; color:#94a3b8; font-size:12px;">${item.date || '-'}</td><td><div class="student-cell-flex"><div class="student-avatar-circle">${initials}</div><div><div class="student-name-text">${item.name || '-'}</div><div class="student-email-text">${item.email || '-'}</div></div></div></td><td style="font-variant-numeric:tabular-nums; font-size:12.5px;">${item.cpf || '-'}</td><td style="font-variant-numeric:tabular-nums; font-size:12.5px;">${item.phone || '-'}</td><td><span class="table-badge-course ${courseBadgeClass}">${item.course || '-'}</span><div style="font-size:11px; color:#94a3b8; margin-top:3px;">${item.shift || '-'}</div></td><td><span class="table-badge-shirt">${item.shirt || '-'}</span></td><td><span class="table-badge-pay ${payClass}">${item.paymentMethod || 'PIX'}</span></td><td style="font-variant-numeric:tabular-nums; font-weight:700; color:#ffffff;">R$ ${(item.amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td><td><span class="table-badge-status-confirmed">${item.status || 'Confirmada'}</span></td><td><div class="table-actions-row"><button type="button" class="table-action-btn" onclick="openStudentDossier('${item.protocol}')">Ficha</button><button type="button" class="table-action-btn" onclick="openStudentEditModal('${item.protocol}')">Editar</button><a href="${whatsLink}" target="_blank" rel="noopener noreferrer" class="table-action-btn-whats">WhatsApp</a><button type="button" class="table-action-btn-del" onclick="deleteStudentRecord('${item.protocol}')">Excluir</button></div></td></tr>`;
      }).join('');
    }
    window.renderAdminTable = renderAdminTable;

    function renderMetricsDashboard() {
      const list = getStoredEnrollments();
      const totalStudents = list.length;
      let totalRev = 0;
      let payCounts = { PIX: 0, CREDITO: 0, DEBITO: 0 };
      let payRevenue = { PIX: 0, CREDITO: 0, DEBITO: 0 };
      let shiftCounts = { sabado: 0, domingo: 0, noturno: 0 };
      let uniformCounts = { P: 0, M: 0, G: 0, GG: 0, XGG: 0 };
      list.forEach(i => {
        const amt = i.amount || 1000;
        totalRev += amt;
        const pm = (i.paymentMethod || 'PIX').toUpperCase();
        if (pm === 'PIX') { payCounts.PIX++; payRevenue.PIX += amt; }
        else if (pm === 'CREDITO') { payCounts.CREDITO++; payRevenue.CREDITO += amt; }
        else if (pm === 'DEBITO') { payCounts.DEBITO++; payRevenue.DEBITO += amt; }
        const sh = (i.shift || '').toLowerCase();
        if (sh.includes('sábado') || sh.includes('sabado')) shiftCounts.sabado++;
        else if (sh.includes('domingo')) shiftCounts.domingo++;
        else if (sh.includes('noturno')) shiftCounts.noturno++;
        const sz = (i.shirt || 'M').toUpperCase();
        if (uniformCounts[sz] !== undefined) uniformCounts[sz]++;
      });
      const payContainer = document.getElementById('metricsPaymentDistribution');
      if (payContainer) {
        const pixPct = totalRev > 0 ? Math.round((payRevenue.PIX / totalRev) * 100) : 0;
        const credPct = totalRev > 0 ? Math.round((payRevenue.CREDITO / totalRev) * 100) : 0;
        const debPct = totalRev > 0 ? Math.round((payRevenue.DEBITO / totalRev) * 100) : 0;

        payContainer.innerHTML = `
          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>PIX (À Vista Instantâneo)</span>
              <strong>${payCounts.PIX} alunos • R$ ${payRevenue.PIX.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${pixPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${pixPct}%; background: #10b981;"></div>
            </div>
          </div>

          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Cartão de Crédito (Até 12x)</span>
              <strong>${payCounts.CREDITO} alunos • R$ ${payRevenue.CREDITO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${credPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${credPct}%; background: #38bdf8;"></div>
            </div>
          </div>

          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="6" cy="15" r="1.5"/><circle cx="10" cy="15" r="1.5"/></svg>Cartão de Débito (À Vista 3DS)</span>
              <strong>${payCounts.DEBITO} alunos • R$ ${payRevenue.DEBITO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${debPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${debPct}%; background: #facc15;"></div>
            </div>
          </div>
        `;
      }

      // 2. Renderiza Turnos
      const shiftContainer = document.getElementById('metricsShiftDistribution');
      if (shiftContainer) {
        const sabPct = totalStudents > 0 ? Math.round((shiftCounts.sabado / totalStudents) * 100) : 0;
        const domPct = totalStudents > 0 ? Math.round((shiftCounts.domingo / totalStudents) * 100) : 0;
        const notPct = totalStudents > 0 ? Math.round((shiftCounts.noturno / totalStudents) * 100) : 0;

        shiftContainer.innerHTML = `
          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Turma de Sábados (08h às 17h)</span>
              <strong>${shiftCounts.sabado} alunos (${sabPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${sabPct}%; background: #ef4444;"></div>
            </div>
          </div>

          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Turma de Domingos (08h às 17h)</span>
              <strong>${shiftCounts.domingo} alunos (${domPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${domPct}%; background: #38bdf8;"></div>
            </div>
          </div>

          <div class="progress-stat-row">
            <div class="progress-stat-header">
              <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>Turma Noturna (Seg a Qui 19h às 22h)</span>
              <strong>${shiftCounts.noturno} alunos (${notPct}%)</strong>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${notPct}%; background: #c084fc;"></div>
            </div>
          </div>
        `;
      }

      // 3. Atualiza Estoque de Fardamento
      if (document.getElementById('uniformCountP')) document.getElementById('uniformCountP').textContent = uniformCounts.P;
      if (document.getElementById('uniformCountM')) document.getElementById('uniformCountM').textContent = uniformCounts.M;
      if (document.getElementById('uniformCountG')) document.getElementById('uniformCountG').textContent = uniformCounts.G;
      if (document.getElementById('uniformCountGG')) document.getElementById('uniformCountGG').textContent = uniformCounts.GG;
      if (document.getElementById('uniformCountXGG')) document.getElementById('uniformCountXGG').textContent = uniformCounts.XGG;
      if (document.getElementById('uniformCountTotal')) document.getElementById('uniformCountTotal').textContent = totalStudents;
    }
    window.renderMetricsDashboard = renderMetricsDashboard;

    // =========================================================================
    // MODAL 4: DOSSIÊ ACADÊMICO & FICHA DO ALUNO
    // =========================================================================
    function openStudentDossier(protocol) {
      const list = getStoredEnrollments();
      const student = list.find(s => s.protocol === protocol);
      if (!student) {
        alert('Registro de aluno não localizado.');
        return;
      }

      const modal = document.getElementById('modalAdminStudentDossier');
      if (!modal) return;

      // Iniciais
      const parts = (student.name || 'Aluno').trim().split(/\s+/);
      const initials = ((parts[0] ? parts[0][0] : 'A') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();

      document.getElementById('dossierAvatar').textContent = initials;
      document.getElementById('dossierProtocolTitle').textContent = student.protocol;
      document.getElementById('dossierName').textContent = student.name;
      document.getElementById('dossierDate').textContent = `Matrícula: ${student.date}`;
      document.getElementById('dossierCpf').textContent = student.cpf;
      document.getElementById('dossierPhone').textContent = student.phone;
      document.getElementById('dossierEmail').textContent = student.email || '—';
      document.getElementById('dossierBirth').textContent = student.birth || '—';
      document.getElementById('dossierCourse').textContent = student.course;
      document.getElementById('dossierShift').textContent = student.shift;
      document.getElementById('dossierShirt').textContent = `Camiseta Tamanho ${student.shirt || 'M'}`;
      document.getElementById('dossierPayment').textContent = `R$ ${(student.amount || 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} via ${student.paymentMethod}`;

      // Status
      const statusBadge = document.getElementById('dossierStatusBadge');
      statusBadge.textContent = (student.status || 'CONFIRMADA').toUpperCase();
      statusBadge.className = 'table-badge-status-confirmed';
      if ((student.status || '').includes('Análise')) statusBadge.className = 'table-badge-status-pending';
      else if ((student.status || '').includes('Aula')) statusBadge.className = 'table-badge-status-active';
      else if ((student.status || '').includes('Formado')) statusBadge.className = 'table-badge-status-graduated';
      else if ((student.status || '').includes('Cancelado')) statusBadge.className = 'table-badge-status-cancelled';

      // Disparos WhatsApp
      const cleanPhone = (student.phone || '').replace(/\D/g, '');
      const msgWelcome = `Olá ${student.name}! Confirmamos sua matrícula oficial no curso de ${student.course} na ANRC (Protocolo: ${student.protocol}). Seja muito bem-vindo à nossa academia operacional!`;
      const msgUniform = `Prezado(a) ${student.name}, confirmamos a solicitação do seu Kit Fardamento Oficial no tamanho ${student.shirt || 'M'} para o curso de ${student.course}. A entrega será realizada na aula inaugural.`;
      const msgStart = `Atenção ${student.name}: suas aulas no curso de ${student.course} no turno de ${student.shift} estão confirmadas. Prepare seu caderno de anotações e documentos. Qualquer dúvida estamos à disposição!`;

      document.getElementById('dossierWaWelcome').href = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msgWelcome)}`;
      document.getElementById('dossierWaUniform').href = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msgUniform)}`;
      document.getElementById('dossierWaStart').href = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msgStart)}`;

      // Botão Editar dentro do Dossiê
      const btnEdit = document.getElementById('btnDossierEditStudent');
      if (btnEdit) {
        btnEdit.onclick = () => {
          closeStudentDossier();
          openStudentEditModal(student.protocol);
        };
      }

      modal.classList.add('active');
    }
    window.openStudentDossier = openStudentDossier;

    function closeStudentDossier() {
      const modal = document.getElementById('modalAdminStudentDossier');
      if (modal) modal.classList.remove('active');
    }
    window.closeStudentDossier = closeStudentDossier;

    // =========================================================================
    // MODAL 5: EDIÇÃO DE ALUNO (CRUD COMPLETO)
    // =========================================================================
    function openStudentEditModal(protocol) {
      const list = getStoredEnrollments();
      const student = list.find(s => s.protocol === protocol);
      if (!student) {
        alert('Aluno não localizado.');
        return;
      }

      const modal = document.getElementById('modalAdminEditStudent');
      if (!modal) return;

      document.getElementById('editModalProtocolTitle').textContent = `EDITAR: ${student.protocol}`;
      document.getElementById('editStudentProtocol').value = student.protocol;
      document.getElementById('editStudentName').value = student.name;
      document.getElementById('editStudentCpf').value = student.cpf;
      document.getElementById('editStudentPhone').value = student.phone;
      document.getElementById('editStudentEmail').value = student.email || '';
      document.getElementById('editStudentCourse').value = student.course;
      document.getElementById('editStudentShift').value = student.shift;
      document.getElementById('editStudentShirt').value = student.shirt || 'M';
      document.getElementById('editStudentStatus').value = student.status || 'Confirmada';

      modal.classList.add('active');
    }
    window.openStudentEditModal = openStudentEditModal;

    function closeStudentEditModal() {
      const modal = document.getElementById('modalAdminEditStudent');
      if (modal) modal.classList.remove('active');
    }
    window.closeStudentEditModal = closeStudentEditModal;

    function handleAdminEditStudentSubmit(event) {
      event.preventDefault();
      const protocol = document.getElementById('editStudentProtocol').value;
      let list = getStoredEnrollments();
      const idx = list.findIndex(s => s.protocol === protocol);

      if (idx !== -1) {
        list[idx].name = document.getElementById('editStudentName').value.trim();
        list[idx].cpf = document.getElementById('editStudentCpf').value.trim();
        list[idx].phone = document.getElementById('editStudentPhone').value.trim();
        list[idx].email = document.getElementById('editStudentEmail').value.trim();
        list[idx].course = document.getElementById('editStudentCourse').value;
        list[idx].shift = document.getElementById('editStudentShift').value;
        list[idx].shirt = document.getElementById('editStudentShirt').value;
        list[idx].status = document.getElementById('editStudentStatus').value;

        localStorage.setItem('ANRC_MATRICULAS', JSON.stringify(list));
        closeStudentEditModal();
        renderAdminTable();
        renderMetricsDashboard();
        alert(`Matrícula ${protocol} atualizada com sucesso!`);
      }
    }
    window.handleAdminEditStudentSubmit = handleAdminEditStudentSubmit;

    // =========================================================================
    // ABA 3: MATRÍCULA MANUAL (SECRETARIA PRESENCIAL)
    // =========================================================================
    function updateManualCoursePrice() {
      const c = document.getElementById('manualCourse').value;
      const amt = document.getElementById('manualAmount');
      if (c.includes('Combo')) {
        amt.value = 1800;
      } else {
        amt.value = 1000;
      }
    }
    window.updateManualCoursePrice = updateManualCoursePrice;

    function handleAdminManualEnrollSubmit(event) {
      event.preventDefault();
      const now = new Date();
      const newProtocol = `MAT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newStudent = {
        protocol: newProtocol,
        date: now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        name: document.getElementById('manualName').value.trim(),
        cpf: document.getElementById('manualCpf').value.trim(),
        phone: document.getElementById('manualPhone').value.trim(),
        email: document.getElementById('manualEmail').value.trim(),
        birth: document.getElementById('manualBirth').value,
        shirt: document.getElementById('manualShirt').value,
        course: document.getElementById('manualCourse').value,
        shift: document.getElementById('manualShift').value,
        paymentMethod: document.getElementById('manualPayment').value,
        amount: parseFloat(document.getElementById('manualAmount').value) || 1000,
        status: document.getElementById('manualStatus').value
      };

      saveStudentEnrollment(newStudent);
      document.getElementById('adminManualEnrollForm').reset();
      updateManualCoursePrice();

      alert(`Aluno ${newStudent.name} homologado com sucesso sob o protocolo ${newProtocol}!`);
      switchAdminTab('students');
    }
    window.handleAdminManualEnrollSubmit = handleAdminManualEnrollSubmit;

    // =========================================================================
    // ABA 4: FERRAMENTAS & BACKUPS (EXPORTAÇÃO JSON / IMPORTAÇÃO)
    // =========================================================================
    function exportAdminDatabaseJson() {
      const list = getStoredEnrollments();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `ANRC_Matriculas_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
    window.exportAdminDatabaseJson = exportAdminDatabaseJson;

    function importAdminDatabaseJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            if (confirm(`Deseja importar ${imported.length} alunos cadastrados neste arquivo de backup?`)) {
              localStorage.setItem('ANRC_MATRICULAS', JSON.stringify(imported));
              renderAdminTable();
              renderMetricsDashboard();
              alert(`Backup restaurado com sucesso! ${imported.length} alunos carregados.`);
            }
          } else {
            alert('Aviso: O arquivo selecionado não contém uma lista válida de alunos.');
          }
        } catch (err) {
          alert('Erro ao processar arquivo JSON. Verifique a formatação.');
        }
      };
      reader.readAsText(file);
    }
    window.importAdminDatabaseJson = importAdminDatabaseJson;

    // Listeners de Filtros em Tempo Real
    document.getElementById('adminSearchInput').addEventListener('input', renderAdminTable);
    document.getElementById('adminFilterCourse').addEventListener('change', renderAdminTable);
    document.getElementById('adminFilterPayment').addEventListener('change', renderAdminTable);
    if (document.getElementById('adminFilterStatus')) {
      document.getElementById('adminFilterStatus').addEventListener('change', renderAdminTable);
    }
    if (document.getElementById('adminSortOrder')) {
      document.getElementById('adminSortOrder').addEventListener('change', renderAdminTable);
    }

    // Exclusão de Registro
    window.deleteStudentRecord = function(protocol) {
      if (confirm(`Deseja realmente remover o registro de matrícula ${protocol}?`)) {
        let list = getStoredEnrollments();
        list = list.filter(item => item.protocol !== protocol);
        localStorage.setItem('ANRC_MATRICULAS', JSON.stringify(list));
        renderAdminTable();
        renderMetricsDashboard();
      }
    };

    // Limpar Todos
    document.getElementById('btnAdminClearAll').addEventListener('click', () => {
      if (confirm('ATENÇÃO: Deseja apagar todas as matrículas cadastradas no navegador?')) {
        localStorage.setItem('ANRC_MATRICULAS', JSON.stringify([]));
        renderAdminTable();
        renderMetricsDashboard();
      }
    });

    // Exportação em Formato CSV Oficial (Excel Compatível com BOM UTF-8)
    document.getElementById('btnAdminExportCsv').addEventListener('click', () => {
      const list = getStoredEnrollments();
      if (list.length === 0) {
        alert('Não há matrículas para exportar.');
        return;
      }

      let csv = '\uFEFF'; // BOM UTF-8
      csv += 'Protocolo;Data;Nome Completo;CPF;WhatsApp;Email;Data Nasc;Tamanho Camiseta;Curso;Turno;Forma Pagamento;Valor (R$);Status\n';

      list.forEach(i => {
        csv += `"${i.protocol}";"${i.date}";"${i.name}";"${i.cpf}";"${i.phone}";"${i.email}";"${i.birth}";"${i.shirt}";"${i.course}";"${i.shift}";"${i.paymentMethod}";"${i.amount}";"${i.status}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `ANRC_Matriculas_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Inicialização da Tabela
    getStoredEnrollments();

    // =====================================================================
    // CRONÔMETRO AO VIVO BLACK FRIDAY ANRC (CRONOGRAMA ATÉ 29 DE NOVEMBRO)
    // =====================================================================
    (function initBlackFridayCountdown() {
      const targetDate = new Date('2026-11-29T23:59:59-03:00').getTime();
      const daysEl = document.getElementById('bfWatchDays');
      const digitsEl = document.getElementById('bfWatchDigits');
      const mobileEl = document.getElementById('bfMobileTimer');

      function pad(n) {
        return String(n).padStart(2, '0');
      }

      function updateClock() {
        const now = Date.now();
        let diff = targetDate - now;

        if (diff <= 0) {
          if (daysEl) daysEl.textContent = 'ÚLTIMAS HORAS';
          if (digitsEl) digitsEl.textContent = '00:00:00';
          if (mobileEl) mobileEl.textContent = '00D • 00:00:00';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff %= (1000 * 60 * 60);
        const mins = Math.floor(diff / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const timeStr = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        if (daysEl) daysEl.textContent = days === 1 ? '01 DIA' : `${pad(days)} DIAS`;
        if (digitsEl) digitsEl.textContent = timeStr;
        if (mobileEl) mobileEl.textContent = `${pad(days)}D • ${timeStr}`;
      }

      updateClock();
      setInterval(updateClock, 1000);
    })();

    // =====================================================================
    // CONTROLE DE SOM DO VÍDEO 9:16 "TREINE PRA AGIR"
    // =====================================================================
    (function initTreinePraAgirVideo() {
      const video = document.getElementById('videoTreinePraAgir');
      const frame = document.getElementById('treinePraAgirFrame');
      const btn = document.getElementById('btnTreineAgirSound');
      const icon = document.getElementById('iconTreineAgirSound');
      const label = document.getElementById('labelTreineAgirSound');
      if (!video || !frame || !btn) return;

      const svgMuted = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
      const svgSound = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';

      function syncSoundUI() {
        const isMuted = video.muted;
        btn.classList.toggle('is-unmuted', !isMuted);
        if (icon) icon.innerHTML = isMuted ? svgMuted : svgSound;
        if (label) label.textContent = isMuted ? 'ATIVAR SOM' : 'SOM ATIVO';
      }

      function toggleSound(e) {
        if (e) e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted) {
          video.volume = 1;
          video.play().catch(() => {});
        }
        syncSoundUI();
      }

      btn.addEventListener('click', toggleSound);
      frame.addEventListener('click', toggleSound);

      // Tenta ativar o som automaticamente após primeira interação do usuário se a seção estiver visível
      let userInteracted = false;
      function markInteraction() {
        userInteracted = true;
      }
      window.addEventListener('pointerdown', markInteraction, { once: true, passive: true });
      window.addEventListener('keydown', markInteraction, { once: true, passive: true });

      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && userInteracted && video.muted) {
              video.muted = false;
              video.volume = 1;
              video.play().then(syncSoundUI).catch(() => {
                video.muted = true;
                syncSoundUI();
              });
            }
          });
        }, { threshold: 0.45 });
        obs.observe(frame);
      }

      syncSoundUI();
    })();

    // =====================================================================
    // RECICLAGEM PROFISSIONAL: PREÇO CONFIGURÁVEL, VALIDAÇÃO CPF & MATRÍCULA
    // =====================================================================
    const RECICLAGEM_PRICE_KEY = 'ANRC_RECICLAGEM_PRICE';

    function getReciclagemPrice() {
      const saved = parseFloat(localStorage.getItem(RECICLAGEM_PRICE_KEY));
      return !isNaN(saved) && saved > 0 ? saved : 459.97;
    }

    function formatBRL(val) {
      return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function syncReciclagemPriceUI() {
      const price = getReciclagemPrice();
      const formatted = formatBRL(price);
      const displayEl = document.getElementById('reciclagemPriceDisplay');
      const summaryPriceEl = document.getElementById('recSummaryPrice');
      const adminInput = document.getElementById('adminReciclagemPriceInput');
      if (displayEl) displayEl.textContent = formatted;
      if (summaryPriceEl) summaryPriceEl.textContent = formatted;
      if (adminInput) adminInput.value = price.toFixed(2);
    }

    function saveAdminReciclagemPrice() {
      const adminInput = document.getElementById('adminReciclagemPriceInput');
      if (!adminInput) return;
      const val = parseFloat(adminInput.value);
      if (isNaN(val) || val <= 0) {
        alert('Informe um valor válido maior que zero.');
        return;
      }
      localStorage.setItem(RECICLAGEM_PRICE_KEY, val.toFixed(2));
      syncReciclagemPriceUI();
      alert(`Valor da Reciclagem atualizado para ${formatBRL(val)}.`);
    }
    window.saveAdminReciclagemPrice = saveAdminReciclagemPrice;

    function updateReciclagemSummary() {
      const tipo = document.getElementById('recTipo');
      const summaryCourse = document.getElementById('recSummaryCourse');
      if (tipo && summaryCourse) {
        summaryCourse.textContent = tipo.value;
      }
      syncReciclagemPriceUI();
    }
    window.updateReciclagemSummary = updateReciclagemSummary;

    function openReciclagemModal(courseType) {
      const modal = document.getElementById('modalReciclagemEnroll');
      const form = document.getElementById('reciclagemEnrollForm');
      const successView = document.getElementById('reciclagemSuccessView');
      const tipoSelect = document.getElementById('recTipo');
      if (!modal) return;
      if (form) form.style.display = 'block';
      if (successView) successView.style.display = 'none';
      if (tipoSelect && courseType) {
        tipoSelect.value = courseType;
      }
      updateReciclagemSummary();
      modal.classList.add('active');
    }
    window.openReciclagemModal = openReciclagemModal;

    function closeReciclagemModal() {
      const modal = document.getElementById('modalReciclagemEnroll');
      if (modal) modal.classList.remove('active');
    }
    window.closeReciclagemModal = closeReciclagemModal;

    function isValidCpf(cpfStr) {
      const digits = (cpfStr || '').replace(/\D/g, '');
      if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(digits.charAt(i), 10) * (10 - i);
      let rev = 11 - (sum % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(digits.charAt(9), 10)) return false;
      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(digits.charAt(i), 10) * (11 - i);
      rev = 11 - (sum % 11);
      if (rev === 10 || rev === 11) rev = 0;
      return rev === parseInt(digits.charAt(10), 10);
    }

    function handleRecCertFileChange(input) {
      const label = document.getElementById('recFileNameLabel');
      const err = document.getElementById('errRecCertificado');
      if (!input || !input.files || input.files.length === 0) {
        if (label) label.textContent = 'Clique para selecionar o certificado anterior...';
        return;
      }
      const file = input.files[0];
      const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
        input.value = '';
        if (label) label.textContent = 'Arquivo inválido (use PDF, JPG, PNG ou WEBP até 5MB).';
        if (err) err.style.display = 'block';
        return;
      }
      if (err) err.style.display = 'none';
      if (label) {
        label.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        label.style.color = '#e2e8f0';
      }
    }
    window.handleRecCertFileChange = handleRecCertFileChange;

    function submitReciclagemEnrollment(event) {
      event.preventDefault();
      const nome = document.getElementById('recNome');
      const cpf = document.getElementById('recCpf');
      const nasc = document.getElementById('recNasc');
      const whats = document.getElementById('recWhatsApp');
      const email = document.getElementById('recEmail');
      const tipo = document.getElementById('recTipo');
      const conclusao = document.getElementById('recDataConclusao');
      const certInput = document.getElementById('recCertificado');

      let valid = true;
      const setErr = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'block' : 'none';
      };

      const nomeOk = nome && nome.value.trim().length >= 3;
      setErr('errRecNome', !nomeOk);
      if (!nomeOk) valid = false;

      const cpfOk = cpf && isValidCpf(cpf.value);
      setErr('errRecCpf', !cpfOk);
      if (!cpfOk) valid = false;

      const nascOk = nasc && Boolean(nasc.value);
      setErr('errRecNasc', !nascOk);
      if (!nascOk) valid = false;

      const whatsOk = whats && whats.value.replace(/\D/g, '').length >= 10;
      setErr('errRecWhatsApp', !whatsOk);
      if (!whatsOk) valid = false;

      const emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setErr('errRecEmail', !emailOk);
      if (!emailOk) valid = false;

      const conclOk = conclusao && Boolean(conclusao.value);
      setErr('errRecDataConclusao', !conclOk);
      if (!conclOk) valid = false;

      const certOk = certInput && certInput.files && certInput.files.length > 0;
      setErr('errRecCertificado', !certOk);
      if (!certOk) valid = false;

      if (!valid) return;

      const now = new Date();
      const protocol = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const amount = getReciclagemPrice();

      const record = {
        protocol: protocol,
        date: now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        name: nome.value.trim(),
        cpf: cpf.value.trim(),
        phone: whats.value.trim(),
        email: email.value.trim(),
        birth: nasc.value,
        shirt: '-',
        course: tipo.value,
        shift: 'Formação Continuada (À Vista)',
        paymentMethod: 'À VISTA',
        amount: amount,
        status: 'Em Análise',
        previousCompletionDate: conclusao.value,
        certificateFileName: certInput.files[0].name
      };

      saveStudentEnrollment(record);
      if (typeof renderMetricsDashboard === 'function') {
        renderMetricsDashboard();
      }

      document.getElementById('reciclagemEnrollForm').style.display = 'none';
      document.getElementById('recSuccessProtocolBox').textContent = `Protocolo: ${protocol} • ${tipo.value} (${formatBRL(amount)})`;
      document.getElementById('reciclagemSuccessView').style.display = 'block';

      document.getElementById('reciclagemEnrollForm').reset();
      const fileLbl = document.getElementById('recFileNameLabel');
      if (fileLbl) {
        fileLbl.textContent = 'Clique para selecionar o certificado anterior...';
        fileLbl.style.color = '#94a3b8';
      }
    }
    window.submitReciclagemEnrollment = submitReciclagemEnrollment;

    applyCpfMask(document.getElementById('recCpf'));
    applyPhoneMask(document.getElementById('recWhatsApp'));
    syncReciclagemPriceUI();

    function switchAdminTab(tab) {
      const map = {
        students: ['tabBtnStudents', 'adminTabStudentsView'],
        metrics: ['tabBtnMetrics', 'adminTabMetricsView'],
        new: ['tabBtnNew', 'adminTabNewView'],
        tools: ['tabBtnTools', 'adminTabToolsView']
      };
      Object.values(map).forEach(([btnId, paneId]) => {
        const b = document.getElementById(btnId);
        const p = document.getElementById(paneId);
        if (b) b.classList.remove('active');
        if (p) p.classList.remove('active');
      });
      if (map[tab]) {
        const [btnId, paneId] = map[tab];
        const b = document.getElementById(btnId);
        const p = document.getElementById(paneId);
        if (b) b.classList.add('active');
        if (p) p.classList.add('active');
      }
      if (tab === 'students' && typeof renderAdminTable === 'function') renderAdminTable();
      if (tab === 'metrics' && typeof renderMetricsDashboard === 'function') renderMetricsDashboard();
    }
    window.switchAdminTab = switchAdminTab;

    (function initFooterAdminShortcut() {
      const trigger = document.getElementById('footerAdminTrigger');
      const logoTrigger = document.getElementById('footerLogoAdminTrigger');
      const authModal = document.getElementById('modalAdminAuth');
      const portalModal = document.getElementById('modalAdminPortal');
      const authForm = document.getElementById('formAdminAuth');
      const authPassInput = document.getElementById('adminAuthPassword');
      const authErrMsg = document.getElementById('adminAuthErrorMsg');
      const btnCancelUnlock = document.getElementById('btnAdminCancelUnlock');
      const btnPortalClose = document.getElementById('btnAdminPortalClose');

      let clickCount = 0;
      let clickTimer = null;

      function openAdminAuthModal() {
        if (!authModal) return;
        if (authErrMsg) authErrMsg.style.display = 'none';
        if (authPassInput) authPassInput.value = '';
        authModal.classList.add('active');
        setTimeout(() => { if (authPassInput) authPassInput.focus(); }, 60);
      }

      function registerAdminClick(e) {
        if (e) e.stopPropagation();
        clickCount++;
        clearTimeout(clickTimer);
        if (clickCount >= 3) {
          clickCount = 0;
          openAdminAuthModal();
        } else {
          clickTimer = setTimeout(() => { clickCount = 0; }, 1500);
        }
      }

      if (trigger) {
        trigger.style.cursor = 'pointer';
        trigger.addEventListener('click', registerAdminClick);
      } else if (logoTrigger) {
        logoTrigger.addEventListener('click', registerAdminClick);
      }

      if (authForm) {
        authForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const val = (authPassInput ? authPassInput.value : '').trim();
          if (val === 'anrc2026' || val === 'admin@anrc') {
            if (authErrMsg) authErrMsg.style.display = 'none';
            if (authModal) authModal.classList.remove('active');
            if (portalModal) portalModal.classList.add('active');
            if (typeof renderAdminTable === 'function') renderAdminTable();
            if (typeof renderMetricsDashboard === 'function') renderMetricsDashboard();
          } else {
            if (authErrMsg) authErrMsg.style.display = 'block';
            if (authPassInput) {
              authPassInput.value = '';
              authPassInput.focus();
            }
          }
        });
      }

      if (btnCancelUnlock && authModal) {
        btnCancelUnlock.addEventListener('click', () => {
          authModal.classList.remove('active');
        });
      }

      if (btnPortalClose && portalModal) {
        btnPortalClose.addEventListener('click', () => {
          portalModal.classList.remove('active');
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (authModal && authModal.classList.contains('active')) authModal.classList.remove('active');
          if (portalModal && portalModal.classList.contains('active')) portalModal.classList.remove('active');
        }
      });
    })();

    // =====================================================================
    // QUIZ: ASSISTÊNCIA À SAÚDE EM EVENTOS (13 PERGUNTAS -> WHATSAPP)
    // =====================================================================
    (function initEventQuizController() {
      const QUIZ_CONFIGS = {
        eventos: {
          title: 'Assistência à Saúde em Eventos',
          waHeader: '🚑 *SOLICITAÇÃO DE ASSISTÊNCIA À SAÚDE EM EVENTOS • ANRC*',
          questions: [
            {
              question: 'Primeiramente, qual é o seu nome?',
              type: 'text',
              placeholder: 'Digite seu nome completo...',
              required: true
            },
            {
              question: 'Me informe o seu número de telefone (WhatsApp)',
              type: 'tel',
              placeholder: '(84) 9 8893-4945',
              required: true
            },
            {
              question: 'Qual o nome do seu evento?',
              type: 'text',
              placeholder: 'Ex: Festival de Verão, Corrida Noturna...',
              required: true
            },
            {
              question: 'Quando e onde o evento vai acontecer?',
              type: 'textarea',
              placeholder: 'Informe a data, horário e endereço/local do evento...',
              required: true
            },
            {
              question: 'Qual é a duração estimada do evento?',
              type: 'text',
              chips: ['Até 4 horas', '4 a 8 horas', '8 a 12 horas', 'Mais de 1 dia'],
              placeholder: 'Ex: 6 horas ou 3 dias...',
              required: true
            },
            {
              question: 'Que tipo de evento está sendo realizado? (Exemplos: casamento, festival, conferência, corrida, etc.)',
              type: 'text',
              chips: ['Festival / Show', 'Corrida / Esportivo', 'Conferência / Corporativo', 'Casamento / Social'],
              placeholder: 'Descreva o tipo de evento...',
              required: true
            },
            {
              question: 'Quantas pessoas são esperadas para participar do evento?',
              type: 'text',
              chips: ['Até 200 pessoas', '200 a 500 pessoas', '500 a 2.000 pessoas', 'Acima de 2.000 pessoas'],
              placeholder: 'Informe o público estimado...',
              required: true
            },
            {
              question: 'Você precisa de socorristas para cobrir todo o evento ou apenas determinadas partes? Se sim, quais?',
              type: 'textarea',
              chips: ['Todo o evento', 'Apenas horários/áreas específicas'],
              placeholder: 'Especifique se precisa cobertura integral ou parcial e quais partes...',
              required: true
            },
            {
              question: 'Existe algum risco específico associado ao evento que devemos considerar? (Exemplos: atividades esportivas, público de alta idade, etc.)',
              type: 'textarea',
              chips: ['Não há riscos específicos', 'Atividades esportivas', 'Público idoso / infantil', 'Estrutura / Grande aglomeração'],
              placeholder: 'Descreva possíveis riscos ou observações...',
              required: true
            },
            {
              question: 'O evento será realizado em um local de fácil acesso para veículos de emergência?',
              type: 'text',
              chips: ['Sim, acesso fácil e direto', 'Acesso parcialmente restrito', 'Local de difícil acesso'],
              placeholder: 'Descreva as condições de acesso para ambulâncias...',
              required: true
            },
            {
              question: 'Existem restrições de estacionamento ou acessibilidade que devemos saber?',
              type: 'textarea',
              chips: ['Sem restrições', 'Necessita credenciamento / autorização'],
              placeholder: 'Informe detalhes sobre estacionamento, portões ou acessibilidade...',
              required: true
            },
            {
              question: 'Você tem alguma exigência específica para os socorristas? (Exemplos: certificações específicas, línguas faladas, habilidades especiais)',
              type: 'textarea',
              chips: ['Nenhuma exigência adicional', 'Ambulância no local', 'Bombeiro Civil + Socorrista'],
              placeholder: 'Descreva exigências específicas, se houver...',
              required: true
            },
            {
              question: 'Se você realizou eventos semelhantes no passado, houve necessidade de serviços médicos de emergência? Se sim, que tipo de serviços foram necessários?',
              type: 'textarea',
              chips: ['Primeiro evento / Nunca houve', 'Atendimentos leves (mal-estar / curativos)', 'Remoção de urgência'],
              placeholder: 'Conte-nos sobre ocorrências em edições anteriores...',
              required: true
            }
          ]
        },
        remocao: {
          title: 'Remoção de Pacientes',
          waHeader: '🚑 *SOLICITAÇÃO DE REMOÇÃO DE PACIENTES • ANRC*',
          questions: [
            {
              question: 'Primeiramente, qual é o seu nome?',
              type: 'text',
              placeholder: 'Digite seu nome completo...',
              required: true
            },
            {
              question: 'Me informe o seu número de telefone (WhatsApp)',
              type: 'tel',
              placeholder: '(84) 9 8893-4945',
              required: true
            },
            {
              question: 'Qual é o endereço de origem e o destino da remoção?',
              type: 'textarea',
              placeholder: 'Ex: Residência / Hospital de origem até o hospital ou clínica de destino...',
              required: true
            },
            {
              question: 'Para qual data e horário você precisa da remoção?',
              type: 'text',
              chips: ['Imediata / Hoje', 'Amanhã', 'Agendamento futuro'],
              placeholder: 'Informe data e horário desejados...',
              required: true
            },
            {
              question: 'Qual o estado clínico e tipo de ambulância necessária?',
              type: 'text',
              chips: ['Ambulância Básica (USB) - Paciente estável', 'UTI Móvel (USA) - Suporte avançado', 'Não sei informar (preciso de orientação)'],
              placeholder: 'Descreva se o paciente usa oxigênio, maca, cadeira de rodas...',
              required: true
            },
            {
              question: 'Há alguma observação importante sobre o paciente ou acesso ao local?',
              type: 'textarea',
              chips: ['Sem observações adicionais', 'Prédio sem elevador / Escadas', 'Uso contínuo de oxigênio'],
              placeholder: 'Informe peso aproximado, acessibilidade ou cuidados especiais...',
              required: true
            }
          ]
        },
        homecare: {
          title: 'Home Care / Visita Domiciliar (EMAD)',
          waHeader: '🩺 *SOLICITAÇÃO DE HOME CARE / VISITA DOMICILIAR • ANRC*',
          questions: [
            {
              question: 'Primeiramente, qual é o seu nome?',
              type: 'text',
              placeholder: 'Digite seu nome completo...',
              required: true
            },
            {
              question: 'Me informe o seu número de telefone (WhatsApp)',
              type: 'tel',
              placeholder: '(84) 9 8893-4945',
              required: true
            },
            {
              question: 'Qual é o bairro e cidade do atendimento domiciliar?',
              type: 'text',
              placeholder: 'Informe o endereço ou bairro para visita...',
              required: true
            },
            {
              question: 'Qual tipo de acompanhamento domiciliar você procura?',
              type: 'text',
              chips: ['Visita pontual / Curativo / Medicação', 'Plantão de Enfermagem (12h / 24h)', 'Acompanhamento pós-alta hospitalar', 'Avaliação multiprofissional'],
              placeholder: 'Descreva o serviço desejado...',
              required: true
            },
            {
              question: 'Descreva brevemente as necessidades do paciente e quando deseja iniciar:',
              type: 'textarea',
              chips: ['Início imediato', 'Ainda esta semana', 'Apenas orçamento inicial'],
              placeholder: 'Informe idade, condição clínica e frequência desejada...',
              required: true
            }
          ]
        }
      };

      let activeQuizKey = 'eventos';
      let currentStep = 0;
      let answers = Array(QUIZ_CONFIGS.eventos.questions.length).fill('');

      function getQuestions() {
        return (QUIZ_CONFIGS[activeQuizKey] || QUIZ_CONFIGS.eventos).questions;
      }

      function formatPhoneInput(el) {
        if (!el) return;
        let v = el.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        else if (v.length > 0) v = v.replace(/^(\d{0,2})/, '($1');
        el.value = v;
      }

      function renderStep() {
        const questions = getQuestions();
        const q = questions[currentStep];
        const total = questions.length;
        const pct = Math.round(((currentStep + 1) / total) * 100);

        document.getElementById('eventQuizQuestionView').style.display = 'block';
        document.getElementById('eventQuizSuccessView').style.display = 'none';
        document.getElementById('eventQuizFooter').style.display = 'flex';
        document.getElementById('eventQuizError').style.display = 'none';

        document.getElementById('eventQuizStepLabel').textContent = `Pergunta ${currentStep + 1} de ${total}`;
        document.getElementById('eventQuizPercentLabel').textContent = `${pct}%`;
        document.getElementById('eventQuizProgressFill').style.width = `${pct}%`;
        document.getElementById('eventQuizQuestionText').textContent = q.question;

        const chipsWrap = document.getElementById('eventQuizChips');
        chipsWrap.innerHTML = '';
        if (q.chips && q.chips.length > 0) {
          chipsWrap.style.display = 'flex';
          q.chips.forEach((chipText) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'event-quiz-chip' + (answers[currentStep] === chipText ? ' selected' : '');
            btn.textContent = chipText;
            btn.addEventListener('click', () => {
              const inputEl = document.getElementById('eventQuizActiveInput');
              if (inputEl) {
                inputEl.value = chipText;
                answers[currentStep] = chipText;
              }
              chipsWrap.querySelectorAll('.event-quiz-chip').forEach((c) => c.classList.remove('selected'));
              btn.classList.add('selected');
              document.getElementById('eventQuizError').style.display = 'none';
            });
            chipsWrap.appendChild(btn);
          });
        } else {
          chipsWrap.style.display = 'none';
        }

        const fieldContainer = document.getElementById('eventQuizFieldContainer');
        fieldContainer.innerHTML = '';
        const inputEl = document.createElement(q.type === 'textarea' ? 'textarea' : 'input');
        inputEl.id = 'eventQuizActiveInput';
        if (q.type !== 'textarea') inputEl.type = q.type;
        inputEl.className = q.type === 'textarea' ? 'event-quiz-textarea' : 'event-quiz-input';
        inputEl.placeholder = q.placeholder || '';
        inputEl.value = answers[currentStep] || '';

        if (q.type === 'tel') {
          inputEl.maxLength = 15;
          inputEl.addEventListener('input', () => formatPhoneInput(inputEl));
        }

        inputEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && q.type !== 'textarea') {
            e.preventDefault();
            nextEventQuizStep();
          }
        });

        fieldContainer.appendChild(inputEl);
        setTimeout(() => inputEl.focus(), 50);

        const prevBtn = document.getElementById('eventQuizBtnPrev');
        const nextBtn = document.getElementById('eventQuizBtnNext');
        if (prevBtn) prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.textContent = currentStep === total - 1 ? 'Finalizar e Enviar ➔' : 'Próxima ➔';
      }

      function openServiceQuizModal(serviceKey) {
        activeQuizKey = QUIZ_CONFIGS[serviceKey] ? serviceKey : 'eventos';
        const cfg = QUIZ_CONFIGS[activeQuizKey];
        currentStep = 0;
        answers = Array(cfg.questions.length).fill('');
        const titleEl = document.getElementById('eventQuizModalTitle');
        if (titleEl) titleEl.textContent = cfg.title;
        const modal = document.getElementById('modalEventQuiz');
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        renderStep();
      }

      function openEventQuizModal() {
        openServiceQuizModal('eventos');
      }

      function closeEventQuizModal() {
        const modal = document.getElementById('modalEventQuiz');
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }

      function prevEventQuizStep() {
        const inputEl = document.getElementById('eventQuizActiveInput');
        if (inputEl) answers[currentStep] = inputEl.value.trim();
        if (currentStep > 0) {
          currentStep--;
          renderStep();
        }
      }

      function nextEventQuizStep() {
        const cfg = QUIZ_CONFIGS[activeQuizKey] || QUIZ_CONFIGS.eventos;
        const questions = cfg.questions;
        const q = questions[currentStep];
        const inputEl = document.getElementById('eventQuizActiveInput');
        const errEl = document.getElementById('eventQuizError');
        const val = inputEl ? inputEl.value.trim() : '';

        if (q.required && !val) {
          if (errEl) errEl.style.display = 'block';
          if (inputEl) inputEl.focus();
          return;
        }

        answers[currentStep] = val;

        if (currentStep < questions.length - 1) {
          currentStep++;
          renderStep();
        } else {
          const lines = questions.map((item, idx) => `*${idx + 1}. ${item.question}*\n${answers[idx]}`);
          const msg = `${cfg.waHeader}\n\n${lines.join('\n\n')}`;
          const waUrl = `https://wa.me/5584988934945?text=${encodeURIComponent(msg)}`;

          document.getElementById('eventQuizQuestionView').style.display = 'none';
          document.getElementById('eventQuizFooter').style.display = 'none';
          document.getElementById('eventQuizSuccessView').style.display = 'block';
          document.getElementById('eventQuizWhatsappBtn').href = waUrl;
        }
      }

      window.openServiceQuizModal = openServiceQuizModal;
      window.openEventQuizModal = openEventQuizModal;
      window.closeEventQuizModal = closeEventQuizModal;
      window.prevEventQuizStep = prevEventQuizStep;
      window.nextEventQuizStep = nextEventQuizStep;
    })();