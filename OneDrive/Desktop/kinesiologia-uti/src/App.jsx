import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [pantallaGlobal, setPantallaGlobal] = useState('inicio');
  const [origenHerramienta, setOrigenHerramienta] = useState('inicio');
  const [temaOscuro, setTemaOscuro] = useState(() => JSON.parse(localStorage.getItem('kine_tema')) || false);

  // PERSISTENCIA LOCALSTORAGE
  const [pacientesGlobales, setPacientesGlobales] = useState(() => {
    const localData = localStorage.getItem('kine_pacientes');
    return localData ? JSON.parse(localData) : [
      { id: 1, nombre: 'Pérez, Juan', cama: 'Box 4', origen: 'Clínica Gráficos', motivo: 'Fallo Cardiorrespiratorio', altura: '175', evoluciones: [], pronoInicio: null, mrcNota: null }
    ];
  });

  const [listaNotas, setListaNotas] = useState(() => {
    const localData = localStorage.getItem('kine_notas');
    return localData ? JSON.parse(localData) : [{ id: 1, texto: 'Chequear parámetros de ventilación mecánica al ingresar.' }];
  });

  const [checklistGuardia, setChecklistGuardia] = useState(() => {
    const localData = localStorage.getItem('kine_checklist');
    return localData ? JSON.parse(localData) : [
      { id: 1, text: 'Revisar tubos endotraqueales y manguitos', checked: false },
      { id: 2, text: 'Verificar humidificadores y cascadas', checked: false },
      { id: 3, text: 'Chequear tomas de O2 y aspiración', checked: false },
      { id: 4, text: 'Realizar censo general de kinesio', checked: false }
    ];
  });

  const [listaEventosAgenda, setListaEventosAgenda] = useState(() => {
    const localData = localStorage.getItem('kine_agenda');
    return localData ? JSON.parse(localData) : [
      { id: 1, tipo: 'Guardia', lugar: 'Clínica Gráficos', hora: 'Sábado 12:00 a Domingo 20:00', diaNum: new Date().getDate(), mesNum: new Date().getMonth(), anioNum: new Date().getFullYear() }
    ];
  });

  const [listaImagenes, setListaImagenes] = useState(() => {
    const localData = localStorage.getItem('kine_imagenes');
    return localData ? JSON.parse(localData) : [
      { id: 1, paciente: 'Pérez, Juan', tipo: 'Rx de Tórax', hallazgo: 'Infiltrado bibasal bilateral. Sin neumotórax.', fecha: '22/07/2026' }
    ];
  });

  useEffect(() => { localStorage.setItem('kine_pacientes', JSON.stringify(pacientesGlobales)); }, [pacientesGlobales]);
  useEffect(() => { localStorage.setItem('kine_notas', JSON.stringify(listaNotas)); }, [listaNotas]);
  useEffect(() => { localStorage.setItem('kine_checklist', JSON.stringify(checklistGuardia)); }, [checklistGuardia]);
  useEffect(() => { localStorage.setItem('kine_agenda', JSON.stringify(listaEventosAgenda)); }, [listaEventosAgenda]);
  useEffect(() => { localStorage.setItem('kine_imagenes', JSON.stringify(listaImagenes)); }, [listaImagenes]);
  useEffect(() => { localStorage.setItem('kine_tema', JSON.stringify(temaOscuro)); }, [temaOscuro]);

  // RELOJ PRONO
  const [horaActual, setHoraActual] = useState(Date.now());
  useEffect(() => { const int = setInterval(() => setHoraActual(Date.now()), 60000); return () => clearInterval(int); }, []);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');
  const [ingresoConfirmado, setIngresoConfirmado] = useState(false);
  const [filtroHospitalCenso, setFiltroHospitalCenso] = useState('Todos');

  // FORMULARIO PACIENTE
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreForm, setNombreForm] = useState(''); const [camaForm, setCamaForm] = useState(''); const [origenForm, setOrigenForm] = useState(''); const [motivoForm, setMotivoForm] = useState(''); const [alturaForm, setAlturaForm] = useState('');
  const [editandoCama, setEditandoCama] = useState(false); const [nuevaCamaForm, setNuevaCamaForm] = useState('');

  // EVOLUCION
  const [modoVent, setModoVent] = useState(''); const [fio2, setFio2] = useState(''); const [peep, setPeep] = useState(''); const [vt, setVt] = useState(''); const [fr, setFr] = useState(''); const [pPico, setPPico] = useState(''); const [pPlateau, setPPlateau] = useState(''); const [autoPeep, setAutoPeep] = useState(''); const [ph, setPh] = useState(''); const [pao2, setPao2] = useState(''); const [paco2, setPaco2] = useState(''); const [hco3, setHco3] = useState(''); const [sodio, setSodio] = useState(''); const [potasio, setPotasio] = useState(''); const [rassEvo, setRassEvo] = useState('');
  const [evolucionEditandoId, setEvolucionEditandoId] = useState(null);

  // HERRAMIENTAS
  const [herramientaActiva, setHerramientaActiva] = useState(null);
  const [pesoInput, setPesoInput] = useState(''); const [generoInput, setGeneroInput] = useState('masculino'); const [resultadoPbw, setResultadoPbw] = useState(null);
  const [pao2Input, setPao2Input] = useState(''); const [fio2Input, setFio2Input] = useState(''); const [resultadoPafi, setResultadoPafi] = useState(null);
  const [pPicoDp, setPPicoDp] = useState(''); const [peepDp, setPeepDp] = useState(''); const [resultadoDp, setResultadoDp] = useState(null);
  const [pPlatCstat, setPPlatCstat] = useState(''); const [peepCstat, setPeeepCstat] = useState(''); const [vtCstat, setVtCstat] = useState(''); const [resultadoCstat, setResultadoCstat] = useState(null);
  const [frTobin, setFrTobin] = useState(''); const [vtTobin, setVtTobin] = useState(''); const [resultadoTobin, setResultadoTobin] = useState(null);
  
  const [mrcModalAbierto, setMrcModalAbierto] = useState(false);
  const [mrcIzq, setMrcIzq] = useState({ hombro: 5, codo: 5, muneca: 5, cadera: 5, rodilla: 5, tobillo: 5 });
  const [mrcDer, setMrcDer] = useState({ hombro: 5, codo: 5, muneca: 5, cadera: 5, rodilla: 5, tobillo: 5 });
  const [glasgowO, setGlasgowO] = useState('4'); const [glasgowV, setGlasgowV] = useState('5'); const [glasgowM, setGlasgowM] = useState('6');

  // AGENDA Y CALENDARIO
  const [vistaAgenda, setVistaAgenda] = useState('lista');
  const [mesActualCal, setMesActualCal] = useState(new Date().getMonth());
  const [anioActualCal, setAnioActualCal] = useState(new Date().getFullYear());
  const [tipoAgendaForm, setTipoAgendaForm] = useState('Guardia');
  const [lugarAgendaForm, setLugarAgendaForm] = useState('Clínica Gráficos');
  const [rangoInicioAgenda, setRangoInicioAgenda] = useState('Sábado 12:00 a Domingo 20:00');

  // OTROS ESTADOS
  const [protocoloAbierto, setProtocoloAbierto] = useState(null);
  const [nuevaNotaTexto, setNuevaNotaTexto] = useState(''); const [grabando, setGrabando] = useState(false);
  const [pcrActivo, setPcrActivo] = useState(false); const [segundosPcr, setSegundosPcr] = useState(0); const [eventosPcr, setEventosPcr] = useState([]);
  const [pacienteImgForm, setPacienteImgForm] = useState(''); const [tipoImgForm, setTipoImgForm] = useState('Rx de Tórax'); const [hallazgoImgForm, setHallazgoImgForm] = useState('');

  // CONFIGURACIÓN PERFIL
  const [nombrePerfil, setNombrePerfil] = useState(() => localStorage.getItem('kine_nombre') || 'Lic. Kinesiólogo / Fisioterapeuta');
  const [matriculaPerfil, setMatriculaPerfil] = useState(() => localStorage.getItem('kine_matricula') || 'MP 12345');

  useEffect(() => {
    localStorage.setItem('kine_nombre', nombrePerfil);
    localStorage.setItem('kine_matricula', matriculaPerfil);
  }, [nombrePerfil, matriculaPerfil]);

  useEffect(() => {
    if (temaOscuro) { document.body.classList.add('dark-theme'); }
    else { document.body.classList.remove('dark-theme'); }
  }, [temaOscuro]);

  useEffect(() => {
    let intervalo = null;
    if (pcrActivo) { intervalo = setInterval(() => { setSegundosPcr(s => s + 1); }, 1000); }
    else { clearInterval(intervalo); }
    return () => clearInterval(intervalo);
  }, [pcrActivo]);

  // DICTADO POR VOZ
  const dictarNotaVoz = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Su navegador no soporta reconocimiento de voz.");
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-AR';
    recognition.onstart = () => setGrabando(true);
    recognition.onresult = (event) => {
      const textoTranscrito = event.results[0][0].transcript;
      setListaNotas([{ id: Date.now(), texto: `[Voz] ${textoTranscrito}` }, ...listaNotas]);
    };
    recognition.onend = () => setGrabando(false);
    recognition.start();
  };

  const agregarNota = (e) => {
    e.preventDefault();
    if (!nuevaNotaTexto.trim()) return;
    setListaNotas([{ id: Date.now(), texto: nuevaNotaTexto }, ...listaNotas]);
    setNuevaNotaTexto('');
  };

  const borrarNota = (id) => { setListaNotas(listaNotas.filter(n => n.id !== id)); };

  const copiarPaseSala = (p) => {
    const evo = p.evoluciones && p.evoluciones[0];
    let txt = `*Pase de Sala - UTI*\nPx: ${p.nombre} | Cama: ${p.cama}\nDX: ${p.motivo}`;
    if (p.mrcNota) txt += `\n*Fuerza MRC:* ${p.mrcNota}`;
    if (evo) txt += `\n*Última Evo:* ${evo.fecha}\nModo: ${evo.modo} | FiO2: ${evo.fio2}% | PEEP: ${evo.peep} | Vt: ${evo.vt}\nGases: pH ${evo.ph} | PaO2 ${evo.pao2} | PaCO2 ${evo.paco2}`;
    navigator.clipboard.writeText(txt).then(() => alert("✅ Pase copiado al portapapeles."));
  };

  const toggleProno = () => {
    setPacientesGlobales(pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, pronoInicio: p.pronoInicio ? null : Date.now() } : p));
    setPacienteSeleccionado(prev => ({ ...prev, pronoInicio: prev.pronoInicio ? null : Date.now() }));
  };

  const getPronoData = (ini) => {
    const tH = (horaActual - ini) / 3600000;
    return { h: Math.floor(tH), m: Math.floor((tH - Math.floor(tH)) * 60), faltan: (16 - tH).toFixed(1), apoyo: Math.floor(tH) > 0 && Math.floor(tH) % 2 === 0 };
  };

  const abrirPbwPaciente = (p, procedencia) => {
    setOrigenHerramienta(procedencia);
    if (p.altura) {
      setPesoInput(p.altura);
      const a = parseFloat(p.altura);
      setResultadoPbw((generoInput === 'masculino' ? 50 + 0.91*(a-152.4) : 45.5 + 0.91*(a-152.4)).toFixed(1));
    }
    setHerramientaActiva('pbw');
    setPantallaGlobal('herramientas');
  };

  const volverDeHerramienta = () => {
    setHerramientaActiva(null);
    if (origenHerramienta === 'paciente' && pacienteSeleccionado) {
      setPantallaGlobal('pacientes_global');
    } else if (origenHerramienta === 'hospital' && hospitalSeleccionado) {
      setPantallaGlobal('hospital');
      setIngresoConfirmado(true);
    } else {
      setPantallaGlobal('herramientas');
    }
  };

  const guardarPaciente = (e) => {
    e.preventDefault();
    if (!nombreForm || !motivoForm || !origenForm) {
      alert("Complete nombre, procedencia y diagnóstico.");
      return;
    }
    const esParticular = origenForm === 'Particular / Domicilio';
    if (!esParticular && !camaForm) {
      alert("Indique la cama o box para el paciente institucional.");
      return;
    }
    const nuevoPaciente = {
      id: Date.now(),
      nombre: nombreForm,
      cama: esParticular ? '-' : camaForm,
      origen: origenForm,
      motivo: motivoForm,
      altura: alturaForm || '170',
      evoluciones: [],
      pronoInicio: null,
      mrcNota: null
    };
    setPacientesGlobales([nuevoPaciente, ...pacientesGlobales]);
    setNombreForm(''); setCamaForm(''); setOrigenForm(''); setMotivoForm(''); setAlturaForm('');
    setMostrarFormulario(false);
  };

  const borrarPaciente = (id) => {
    if (window.confirm("¿Está seguro de eliminar este paciente del censo?")) {
      setPacientesGlobales(pacientesGlobales.filter(p => p.id !== id));
      setPacienteSeleccionado(null);
    }
  };

  const actualizarCama = (e) => {
    e.preventDefault();
    if (!nuevaCamaForm) return;
    const actualizados = pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, cama: nuevaCamaForm } : p);
    setPacientesGlobales(actualizados);
    setPacienteSeleccionado({ ...pacienteSeleccionado, cama: nuevaCamaForm });
    setNuevaCamaForm('');
    setEditandoCama(false);
  };

  const guardarEvolucion = (e) => {
    e.preventDefault();
    if (!modoVent) return;
    const fechaActual = new Date();
    const datosEvo = {
      id: evolucionEditandoId || Date.now(),
      fecha: `${fechaActual.toLocaleDateString()} - ${fechaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hs`,
      modo: modoVent, fio2: fio2 || '-', peep: peep || '-', vt: vt || '-', fr: fr || '-',
      pPico: pPico || '-', pPlateau: pPlateau || '-', autoPeep: autoPeep || '-',
      ph: ph || '-', pao2: pao2 || '-', paco2: paco2 || '-', hco3: hco3 || '-',
      sodio: sodio || '-', potasio: potasio || '-', rass: rassEvo || '-'
    };

    let actualizados;
    if (evolucionEditandoId) {
      actualizados = pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, evoluciones: p.evoluciones.map(ev => ev.id === evolucionEditandoId ? datosEvo : ev) } : p);
      setEvolucionEditandoId(null);
    } else {
      actualizados = pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, evoluciones: [datosEvo, ...p.evoluciones] } : p);
    }
    setPacientesGlobales(actualizados);
    setPacienteSeleccionado(actualizados.find(p => p.id === pacienteSeleccionado.id));
    setModoVent(''); setFio2(''); setPeep(''); setVt(''); setFr(''); setPPico(''); setPPlateau(''); setAutoPeep(''); setPh(''); setPao2(''); setPaco2(''); setHco3(''); setSodio(''); setPotasio(''); setRassEvo('');
  };

  const cargarEvolucionParaEditar = (evo) => {
    setEvolucionEditandoId(evo.id);
    setModoVent(evo.modo);
    setFio2(evo.fio2 === '-' ? '' : evo.fio2);
    setPeep(evo.peep === '-' ? '' : evo.peep);
    setVt(evo.vt === '-' ? '' : evo.vt);
    setFr(evo.fr === '-' ? '' : evo.fr);
    setPPico(evo.pPico === '-' ? '' : evo.pPico);
    setPPlateau(evo.pPlateau === '-' ? '' : evo.pPlateau);
    setAutoPeep(evo.autoPeep === '-' ? '' : evo.autoPeep);
    setPh(evo.ph === '-' ? '' : evo.ph);
    setPao2(evo.pao2 === '-' ? '' : evo.pao2);
    setPaco2(evo.paco2 === '-' ? '' : evo.paco2);
    setHco3(evo.hco3 === '-' ? '' : evo.hco3);
    setSodio(evo.sodio === '-' ? '' : evo.sodio);
    setPotasio(evo.potasio === '-' ? '' : evo.potasio);
    setRassEvo(evo.rass === '-' ? '' : evo.rass);
  };

  const borrarEvolucion = (evoId) => {
    const actualizados = pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, evoluciones: p.evoluciones.filter(ev => ev.id !== evoId) } : p);
    setPacientesGlobales(actualizados);
    setPacienteSeleccionado(actualizados.find(p => p.id === pacienteSeleccionado.id));
  };

  const guardarMrcPaciente = () => {
    const total = Object.values(mrcIzq).reduce((a,b)=>a+b, 0) + Object.values(mrcDer).reduce((a,b)=>a+b, 0);
    const nota = `MRC Total: ${total}/60`;
    const actualizados = pacientesGlobales.map(p => p.id === pacienteSeleccionado.id ? { ...p, mrcNota: nota } : p);
    setPacientesGlobales(actualizados);
    setPacienteSeleccionado(actualizados.find(p => p.id === pacienteSeleccionado.id));
    setMrcModalAbierto(false);
    alert('✅ Escala MRC guardada en la ficha del paciente.');
  };

  const agregarEventoAgenda = (e) => {
    e.preventDefault();
    if (!rangoInicioAgenda.trim()) return alert('Ingrese el rango.');
    const matchDia = rangoInicioAgenda.match(/\d+/);
    const diaNum = matchDia ? parseInt(matchDia[0]) : new Date().getDate();

    const nuevoEv = {
      id: Date.now(),
      tipo: tipoAgendaForm,
      lugar: lugarAgendaForm,
      hora: rangoInicioAgenda,
      diaNum: diaNum,
      mesNum: new Date().getMonth(),
      anioNum: new Date().getFullYear()
    };
    setListaEventosAgenda([nuevoEv, ...listaEventosAgenda]);
    setRangoInicioAgenda('');
    alert('✅ Actividad agregada a la agenda con éxito.');
  };

  const borrarEventoAgenda = (id) => {
    setListaEventosAgenda(listaEventosAgenda.filter(ev => ev.id !== id));
  };

  const agregarImagen = (e) => {
    e.preventDefault();
    if (!pacienteImgForm || !hallazgoImgForm) return alert('Complete los campos.');
    const nuevaImg = {
      id: Date.now(),
      paciente: pacienteImgForm,
      tipo: tipoImgForm,
      hallazgo: hallazgoImgForm,
      fecha: new Date().toLocaleDateString()
    };
    setListaImagenes([nuevaImg, ...listaImagenes]);
    setPacienteImgForm(''); setHallazgoImgForm('');
  };

  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const cambiarMes = (dir) => {
    let m = mesActualCal + dir; let a = anioActualCal;
    if (m > 11) { m = 0; a++; } else if (m < 0) { m = 11; a--; }
    setMesActualCal(m); setAnioActualCal(a);
  };
  const obtenerDiasDelMes = (m, a) => new Date(a, m + 1, 0).getDate();
  const obtenerDiaInicioMes = (m, a) => { const d = new Date(a, m, 1).getDay(); return d === 0 ? 6 : d - 1; };

  const registrarEventoPcr = (tipo) => {
    const fecha = new Date();
    const tiempoStr = `${Math.floor(segundosPcr / 60)}:${segundosPcr % 60 < 10 ? '0' : ''}${segundosPcr % 60}`;
    setEventosPcr([{ id: Date.now(), tipo, tiempo: tiempoStr }, ...eventosPcr]);
  };

  const renderGrillaHerramientas = () => (
    <div style={{ textAlign: 'left', width: '100%' }}>
      <h2>Herramientas Clínicas</h2>
      <p>Seleccione una calculadora o escala.</p>
      
      {herramientaActiva === 'pbw' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Peso Corporal Predicho (PBW) y Vt Protectores</h3>
          <form onSubmit={(e) => { e.preventDefault(); const a = parseFloat(pesoInput); if(!a) return; const res = generoInput === 'masculino' ? 50 + 0.91*(a-152.4) : 45.5 + 0.91*(a-152.4); setResultadoPbw(res.toFixed(1)); }}>
            <div className="form-group"><label>Género</label><select value={generoInput} onChange={(e)=>setGeneroInput(e.target.value)}><option value="masculino">Masculino</option><option value="femenino">Femenino</option></select></div>
            <div className="form-group"><label>Altura (cm)</label><input type="number" placeholder="Ej. 175" value={pesoInput} onChange={(e)=>setPesoInput(e.target.value)} /></div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calcular PBW</button>
          </form>
          {resultadoPbw && (
            <div style={{ marginTop: '0.8rem', background: '#e0f2fe', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}>
              <p style={{ fontWeight: 'bold', color: '#0369a1' }}>PBW: {resultadoPbw} kg</p>
              <p style={{ marginTop: '4px', color: '#334155' }}>• <strong>x6 ml/kg:</strong> {(resultadoPbw * 6).toFixed(0)} ml</p>
              <p style={{ marginTop: '2px', color: '#334155' }}>• <strong>x7 ml/kg:</strong> {(resultadoPbw * 7).toFixed(0)} ml</p>
              <p style={{ marginTop: '2px', color: '#334155' }}>• <strong>x8 ml/kg:</strong> {(resultadoPbw * 8).toFixed(0)} ml</p>
            </div>
          )}
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={volverDeHerramienta}>Volver</button>
        </div>
      ) : herramientaActiva === 'mrc' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Escala MRC Bilateral (Fuerza Muscular en UTI)</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Evalúa 6 grupos musculares diferenciando Izquierda y Derecha (0 a 5). Total 0 a 60.</p>
          
          {['hombro', 'codo', 'muneca', 'cadera', 'rodilla', 'tobillo'].map((m) => (
            <div key={m} style={{ marginBottom: '0.6rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{m}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '2px' }}>
                <div className="form-group"><label style={{fontSize:'0.65rem'}}>Izq (0-5)</label><input type="number" min="0" max="5" value={mrcIzq[m]} onChange={e => setMrcIzq({...mrcIzq, [m]: parseInt(e.target.value)||0})} /></div>
                <div className="form-group"><label style={{fontSize:'0.65rem'}}>Der (0-5)</label><input type="number" min="0" max="5" value={mrcDer[m]} onChange={e => setMrcDer({...mrcDer, [m]: parseInt(e.target.value)||0})} /></div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '0.8rem', background: '#e0f2fe', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <p style={{ fontWeight: 'bold', color: '#0369a1' }}>
              Puntaje Total MRC: {Object.values(mrcIzq).reduce((a,b)=>a+b, 0) + Object.values(mrcDer).reduce((a,b)=>a+b, 0)} / 60
            </p>
            <p style={{ fontSize: '0.75rem', color: '#334155', marginTop: '4px' }}>* Menor a 48 puntos indica DAUTI.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => setHerramientaActiva(null)}>Volver</button>
        </div>
      ) : herramientaActiva === 'pafi' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>PaO2 / FiO2 (PaFi)</h3>
          <form onSubmit={(e) => { e.preventDefault(); const p = parseFloat(pao2Input); const f = parseFloat(fio2Input); if(!p||!f) return; const frac = f > 1 ? f/100 : f; setResultadoPafi((p/frac).toFixed(1)); }}>
            <div className="form-group"><label>PaO2 (mmHg)</label><input type="number" placeholder="90" value={pao2Input} onChange={(e)=>setPao2Input(e.target.value)} /></div>
            <div className="form-group"><label>FiO2 (% o fracción)</label><input type="number" placeholder="40 o 0.4" value={fio2Input} onChange={(e)=>setFio2Input(e.target.value)} /></div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calcular PaFi</button>
          </form>
          {resultadoPafi && <p style={{ marginTop: '0.8rem', fontWeight: 'bold', color: '#0284c7' }}>Resultado: {resultadoPafi} mmHg</p>}
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => { setHerramientaActiva(null); setResultadoPafi(null); }}>Volver</button>
        </div>
      ) : herramientaActiva === 'dp' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Driving Pressure (ΔP)</h3>
          <form onSubmit={(e) => { e.preventDefault(); const p = parseFloat(pPicoDp); const peepVal = parseFloat(peepDp); if(isNaN(p)||isNaN(peepVal)) return; setResultadoDp((p - peepVal).toFixed(1)); }}>
            <div className="form-group"><label>Presión Plateau (cmH2O)</label><input type="number" placeholder="22" value={pPicoDp} onChange={(e)=>setPPicoDp(e.target.value)} /></div>
            <div className="form-group"><label>PEEP total (cmH2O)</label><input type="number" placeholder="5" value={peepDp} onChange={(e)=>setPeepDp(e.target.value)} /></div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calcular ΔP</button>
          </form>
          {resultadoDp && <p style={{ marginTop: '0.8rem', fontWeight: 'bold', color: '#0284c7' }}>Driving Pressure: {resultadoDp} cmH2O (Normal &lt; 15)</p>}
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => { setHerramientaActiva(null); setResultadoDp(null); }}>Volver</button>
        </div>
      ) : herramientaActiva === 'cstat' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Compliance Estática (Cstat)</h3>
          <form onSubmit={(e) => { e.preventDefault(); const plat = parseFloat(pPlatCstat); const peepVal = parseFloat(peepCstat); const vtVal = parseFloat(vtCstat); if(!plat||!vtVal) return; setResultadoCstat((vtVal / (plat - peepVal)).toFixed(1)); }}>
            <div className="form-group"><label>Presión Plateau (cmH2O)</label><input type="number" placeholder="22" value={pPlatCstat} onChange={(e)=>setPPlatCstat(e.target.value)} /></div>
            <div className="form-group"><label>PEEP total (cmH2O)</label><input type="number" placeholder="5" value={peepCstat} onChange={(e)=>setPeeepCstat(e.target.value)} /></div>
            <div className="form-group"><label>Volumen Tidal (ml)</label><input type="number" placeholder="450" value={vtCstat} onChange={(e)=>setVtCstat(e.target.value)} /></div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calcular Cstat</button>
          </form>
          {resultadoCstat && <p style={{ marginTop: '0.8rem', fontWeight: 'bold', color: '#0284c7' }}>Compliance: {resultadoCstat} ml/cmH2O (Normal 50-80)</p>}
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => { setHerramientaActiva(null); setResultadoCstat(null); }}>Volver</button>
        </div>
      ) : herramientaActiva === 'tobin' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Índice de Respiración Superficial Rápida (Tobin / RSBI)</h3>
          <form onSubmit={(e) => { e.preventDefault(); const frVal = parseFloat(frTobin); const vtLitros = parseFloat(vtTobin)/1000; if(!frVal||!vtLitros) return; setResultadoTobin((frVal / vtLitros).toFixed(1)); }}>
            <div className="form-group"><label>Frecuencia Respiratoria (rpm)</label><input type="number" placeholder="20" value={frTobin} onChange={(e)=>setFrTobin(e.target.value)} /></div>
            <div className="form-group"><label>Volumen Tidal (ml)</label><input type="number" placeholder="400" value={vtTobin} onChange={(e)=>setVtTobin(e.target.value)} /></div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calcular Tobin</button>
          </form>
          {resultadoTobin && <p style={{ marginTop: '0.8rem', fontWeight: 'bold', color: '#0284c7' }}>Índice de Tobin: {resultadoTobin} ciclos/min/L (Éxito destete &lt; 105)</p>}
          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => { setHerramientaActiva(null); setResultadoTobin(null); }}>Volver</button>
        </div>
      ) : herramientaActiva === 'glasgow' ? (
        <div className="form-container" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '0.8rem' }}>
          <h3>Escala de Glasgow (OVM Desglosado)</h3>
          
          <div className="form-group"><label>Respuesta Ocular (O)</label>
            <select value={glasgowO} onChange={(e)=>setGlasgowO(e.target.value)}>
              <option value="4">4 - Espontánea</option>
              <option value="3">3 - A la orden / Estímulo verbal</option>
              <option value="2">2 - Al dolor</option>
              <option value="1">1 - Sin respuesta</option>
            </select>
          </div>

          <div className="form-group"><label>Respuesta Verbal (V)</label>
            <select value={glasgowV} onChange={(e)=>setGlasgowV(e.target.value)}>
              <option value="5">5 - Orientado y conversando</option>
              <option value="4">4 - Desorientado / Confuso</option>
              <option value="3">3 - Palabras inapropiadas</option>
              <option value="2">2 - Sonidos incomprensibles</option>
              <option value="1">1 - Sin respuesta</option>
            </select>
          </div>

          <div className="form-group"><label>Respuesta Motora (M)</label>
            <select value={glasgowM} onChange={(e)=>setGlasgowM(e.target.value)}>
              <option value="6">6 - Obedece órdenes</option>
              <option value="5">5 - Localiza el dolor</option>
              <option value="4">4 - Retirada al dolor (flexión normal)</option>
              <option value="3">3 - Flexión anormal (decorticación)</option>
              <option value="2">2 - Extensión anormal (descerebración)</option>
              <option value="1">1 - Sin respuesta</option>
            </select>
          </div>

          <div style={{ marginTop: '0.8rem', background: '#e0f2fe', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <p style={{ fontWeight: 'bold', color: '#0369a1' }}>
              Puntaje Total Glasgow: O{glasgowO} V{glasgowV} M{glasgowM} = {parseInt(glasgowO)+parseInt(glasgowV)+parseInt(glasgowM)} / 15
            </p>
          </div>

          <button className="btn-secondary" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => setHerramientaActiva(null)}>Volver</button>
        </div>
      ) : (
        <div className="tools-grid">
          <div className="tool-card" onClick={() => setHerramientaActiva('pbw')}>Peso Corporal Predicho (PBW & x6, x7, x8)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('mrc')}>Escala MRC Bilateral (Fuerza Muscular UTI)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('glasgow')}>Escala de Glasgow (OVM Desglosado)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('pafi')}>Cálculo PaO2 / FiO2 (PaFi)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('dp')}>Driving Pressure (ΔP)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('cstat')}>Compliance Estática (Cstat)</div>
          <div className="tool-card" onClick={() => setHerramientaActiva('tobin')}>Índice de Tobin (RSBI)</div>
        </div>
      )}
    </div>
  );

  return (
    <div className={temaOscuro ? 'app-container dark-theme' : 'app-container'}>
      <header className="header">
        <div className="header-left">
          {pantallaGlobal !== 'inicio' && (
            <button className="btn-back" onClick={() => { setPantallaGlobal('inicio'); setPacienteSeleccionado(null); setHerramientaActiva(null); setEvolucionEditandoId(null); setMrcModalAbierto(false); }}>
              &lt; Volver
            </button>
          )}
          <h1>KineUTI Mobile</h1>
        </div>
      </header>

      {/* PANTALLA INICIO */}
      {pantallaGlobal === 'inicio' && (
        <main className="home-container">
          <div className="home-grid">
            <div className="home-card hospital" onClick={() => { setOrigenHerramienta('inicio'); setPantallaGlobal('hospital'); }}>
              <h3>Instituciones</h3>
              <p>Servicios y guardias.</p>
            </div>
            <div className="home-card pacientes" onClick={() => { setOrigenHerramienta('inicio'); setPantallaGlobal('pacientes_global'); }}>
              <h3>Pacientes</h3>
              <p>Censo unificado y privados.</p>
            </div>
            <div className="home-card herramientas" onClick={() => { setOrigenHerramienta('inicio'); setPantallaGlobal('herramientas'); }}>
              <h3>Herramientas</h3>
              <p>Calculadoras y escalas.</p>
            </div>
            <div className="home-card pcr" onClick={() => setPantallaGlobal('pcr')}>
              <h3>PCR</h3>
              <p>Metrónomo y ACLS.</p>
            </div>
            <div className="home-card notas" onClick={() => setPantallaGlobal('notas')}>
              <h3>Notas</h3>
              <p>Bloc interactivo con voz.</p>
            </div>
            <div className="home-card protocolos" onClick={() => setPantallaGlobal('protocolos')}>
              <h3>Protocolos</h3>
              <p>ARDSNet y destete.</p>
            </div>
            <div className="home-card valores" onClick={() => setPantallaGlobal('valores')}>
              <h3>Laboratorio</h3>
              <p>Valores ampliados.</p>
            </div>
            <div className="home-card agenda" onClick={() => setPantallaGlobal('agenda')}>
              <h3>Agenda</h3>
              <p>Turnos y calendario.</p>
            </div>
            <div className="home-card imagenes" onClick={() => setPantallaGlobal('imagenes')}>
              <h3>Imágenes / RX</h3>
              <p>Estudios y reportes.</p>
            </div>
            <div className="home-card perfil" onClick={() => setPantallaGlobal('perfil')}>
              <h3>Configuración</h3>
              <p>Ajustes y Modo Noche.</p>
            </div>
          </div>
        </main>
      )}

      {/* MÓDULO HERRAMIENTAS */}
      {pantallaGlobal === 'herramientas' && (
        <main className="main-content"><section className="dashboard-card">{renderGrillaHerramientas()}</section></main>
      )}

      {/* MÓDULO PACIENTES GLOBAL */}
      {pantallaGlobal === 'pacientes_global' && (
        <main className="main-content">
          <section className="dashboard-card">
            {pacienteSeleccionado ? (
              <div className="ficha-paciente">
                <div className="ficha-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2>{pacienteSeleccionado.nombre}</h2>
                      <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Procedencia: {pacienteSeleccionado.origen}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                      <button className="btn-outline" style={{ fontSize: '0.7rem', padding: '4px 6px', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => abrirPbwPaciente(pacienteSeleccionado, 'paciente')}>PBW x6/7/8</button>
                      <button className="btn-danger" style={{ fontSize: '0.7rem', padding: '4px 6px' }} onClick={() => borrarPaciente(pacienteSeleccionado.id)}>Borrar</button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                    <p style={{ marginBottom: 0 }}><strong>Cama:</strong> {pacienteSeleccionado.cama} | <strong>Altura:</strong> {pacienteSeleccionado.altura} cm</p>
                    {pacienteSeleccionado.origen !== 'Particular / Domicilio' && (
                      <button className="btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)', padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setEditandoCama(!editandoCama)}>
                        {editandoCama ? 'Cancelar' : 'Cambiar Cama'}
                      </button>
                    )}
                  </div>

                  {editandoCama && (
                    <form onSubmit={actualizarCama} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                      <input type="text" placeholder="Nueva Cama/Box" value={nuevaCamaForm} onChange={(e) => setNuevaCamaForm(e.target.value)} style={{ padding: '6px', fontSize: '0.85rem', flex: 1, border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                      <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}>Guardar</button>
                    </form>
                  )}
                  <p style={{ marginTop: '0.5rem' }}><strong>DX:</strong> {pacienteSeleccionado.motivo}</p>
                  {pacienteSeleccionado.mrcNota && <p style={{ marginTop: '0.3rem', color: '#10b981', fontWeight: 'bold' }}>💪 {pacienteSeleccionado.mrcNota}</p>}
                </div>

                <div className="button-group" style={{ marginBottom: '1rem', display: 'flex', gap: '6px' }}>
                  <button className="btn-outline" style={{ flex: 1, color: 'var(--primary-color)', borderColor: 'var(--primary-color)', fontSize: '0.8rem' }} onClick={() => copiarPaseSala(pacienteSeleccionado)}>📋 Copiar Pase</button>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => setMrcModalAbierto(!mrcModalAbierto)}>💪 {mrcModalAbierto ? 'Cerrar MRC' : 'Evaluar MRC'}</button>
                </div>

                {mrcModalAbierto && (
                  <div className="form-container" style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Evaluación Fuerza MRC (Bilateral)</h4>
                    {['hombro', 'codo', 'muneca', 'cadera', 'rodilla', 'tobillo'].map((m) => (
                      <div key={m} style={{ marginBottom: '0.5rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '3px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{m}</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '2px' }}>
                          <div className="form-group"><label style={{fontSize:'0.6rem'}}>Izq (0-5)</label><input type="number" min="0" max="5" value={mrcIzq[m]} onChange={e => setMrcIzq({...mrcIzq, [m]: parseInt(e.target.value)||0})} /></div>
                          <div className="form-group"><label style={{fontSize:'0.6rem'}}>Der (0-5)</label><input type="number" min="0" max="5" value={mrcDer[m]} onChange={e => setMrcDer({...mrcDer, [m]: parseInt(e.target.value)||0})} /></div>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={guardarMrcPaciente}>Guardar MRC en Ficha</button>
                  </div>
                )}

                {/* PRONO TIMER */}
                <div className="prono-card">
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Control Decúbito Prono (SDRA)</h4>
                  {pacienteSeleccionado.pronoInicio ? (
                    <>
                      <div className="prono-time">{getPronoData(pacienteSeleccionado.pronoInicio).h}h {getPronoData(pacienteSeleccionado.pronoInicio).m}m</div>
                      {getPronoData(pacienteSeleccionado.pronoInicio).apoyo && <div className="prono-alert">⚠️ Rotar puntos de apoyo faciales y torácicos</div>}
                      <p style={{ fontSize: '0.75rem', marginBottom: '10px' }}>Faltan {getPronoData(pacienteSeleccionado.pronoInicio).faltan} hs para supinar.</p>
                      <button className="btn-secondary" style={{ color: '#1e1b4b', background: '#e0f2fe' }} onClick={toggleProno}>Finalizar Ciclo Prono</button>
                    </>
                  ) : (
                    <button className="btn-primary" style={{ marginTop: '10px', background: '#4f46e5' }} onClick={toggleProno}>▶ Iniciar Prono (16h)</button>
                  )}
                </div>
                
                <div className="evolucion-form">
                  <h3>{evolucionEditandoId ? 'Modificar Evolución' : 'Nueva Evolución Ventilatoria y Gases'}</h3>
                  <form onSubmit={guardarEvolucion}>
                    <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                      <label>Modo Ventilatorio</label>
                      <select value={modoVent} onChange={(e) => setModoVent(e.target.value)}>
                        <option value="">Seleccionar...</option>
                        <option value="VCV">VCV</option>
                        <option value="PCV">PCV</option>
                        <option value="PSV">PSV</option>
                        <option value="CPAP">CPAP</option>
                        <option value="Espontáneo">Espontáneo (AA)</option>
                      </select>
                    </div>
                    <div className="grid-ventilador" style={{ marginBottom: '0.8rem' }}>
                      <div className="form-group"><label>FiO2 (%)</label><input type="number" placeholder="40" value={fio2} onChange={(e) => setFio2(e.target.value)} /></div>
                      <div className="form-group"><label>PEEP</label><input type="number" placeholder="5" value={peep} onChange={(e) => setPeep(e.target.value)} /></div>
                      <div className="form-group"><label>Vt (ml)</label><input type="number" placeholder="450" value={vt} onChange={(e) => setVt(e.target.value)} /></div>
                      <div className="form-group"><label>FR</label><input type="number" placeholder="16" value={fr} onChange={(e) => setFr(e.target.value)} /></div>
                      <div className="form-group"><label>P. Pico</label><input type="number" placeholder="25" value={pPico} onChange={(e) => setPPico(e.target.value)} /></div>
                      <div className="form-group"><label>P. Plateau</label><input type="number" placeholder="20" value={pPlateau} onChange={(e) => setPPlateau(e.target.value)} /></div>
                      <div className="form-group"><label>Auto-PEEP</label><input type="number" placeholder="2" value={autoPeep} onChange={(e) => setAutoPeep(e.target.value)} /></div>
                      <div className="form-group"><label>Escala RASS</label>
                        <select value={rassEvo} onChange={(e) => setRassEvo(e.target.value)}>
                          <option value="">Seleccionar...</option>
                          <option value="+4 (+4 Combativo)">+4 Combativo</option>
                          <option value="+3 (+3 Muy agitado)">+3 Muy agitado</option>
                          <option value="+2 (+2 Agitado)">+2 Agitado</option>
                          <option value="+1 (+1 Inquieto)">+1 Inquieto</option>
                          <option value="0 (0 Alerta)">0 Alerta</option>
                          <option value="-1 (-1 Somnoliento)">-1 Somnoliento</option>
                          <option value="-2 (-2 Sedación leve)">-2 Sedación leve</option>
                          <option value="-3 (-3 Sedación mod.)">-3 Sedación mod.</option>
                          <option value="-4 (-4 Sedación prof.)">-4 Sedación prof.</option>
                          <option value="-5 (-5 No despierta)">-5 No despierta</option>
                        </select>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem', marginTop: '1rem' }}>Gasometría y Electrolitos</p>
                    <div className="grid-ventilador">
                      <div className="form-group"><label>pH</label><input type="number" step="0.01" placeholder="7.40" value={ph} onChange={(e) => setPh(e.target.value)} /></div>
                      <div className="form-group"><label>PaO2</label><input type="number" placeholder="90" value={pao2} onChange={(e) => setPao2(e.target.value)} /></div>
                      <div className="form-group"><label>PaCO2</label><input type="number" placeholder="40" value={paco2} onChange={(e) => setPaco2(e.target.value)} /></div>
                      <div className="form-group"><label>HCO3</label><input type="number" placeholder="24" value={hco3} onChange={(e) => setHco3(e.target.value)} /></div>
                      <div className="form-group"><label>Sodio (Na)</label><input type="number" placeholder="140" value={sodio} onChange={(e) => setSodio(e.target.value)} /></div>
                      <div className="form-group"><label>Potasio (K)</label><input type="number" step="0.1" placeholder="4.0" value={potasio} onChange={(e) => setPotasio(e.target.value)} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.2rem' }}>
                      {evolucionEditandoId && (
                        <button type="button" className="btn-secondary" onClick={() => { setEvolucionEditandoId(null); setModoVent(''); setFio2(''); setPeep(''); setVt(''); setFr(''); setPPico(''); setPPlateau(''); setAutoPeep(''); setPh(''); setPao2(''); setPaco2(''); setHco3(''); setSodio(''); setPotasio(''); setRassEvo(''); }}>Cancelar</button>
                      )}
                      <button type="submit" className="btn-primary" style={{ flex: 1 }}>{evolucionEditandoId ? 'Actualizar Evolución' : 'Guardar Evolución'}</button>
                    </div>
                  </form>
                </div>

                <h3>Historial</h3>
                <div className="evolucion-historial">
                  {pacienteSeleccionado.evoluciones.length === 0 ? <p className="mensaje-vacio">Sin registros.</p> : (
                    pacienteSeleccionado.evoluciones.map(evo => (
                      <div key={evo.id} className="evolucion-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <h4 style={{ margin: 0 }}>{evo.fecha} - <strong>{evo.modo}</strong></h4>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="btn-warning" onClick={() => cargarEvolucionParaEditar(evo)}>Modificar</button>
                            <button className="btn-danger" onClick={() => borrarEvolucion(evo.id)}>Borrar</button>
                          </div>
                        </div>
                        <div className="evolucion-data-grid">
                          <span>FiO2: {evo.fio2}%</span><span>PEEP: {evo.peep}</span>
                          <span>Vt: {evo.vt}ml</span><span>FR: {evo.fr}</span>
                          <span>P.Pico: {evo.pPico}</span><span>P.Plat: {evo.pPlateau}</span>
                          <span>Auto-PEEP: {evo.autoPeep}</span><span>pH: {evo.ph}</span>
                          <span>PaO2: {evo.pao2}</span><span>PaCO2: {evo.paco2}</span><span>HCO3: {evo.hco3}</span>
                          <span>Na: {evo.sodio}</span><span>K: {evo.potasio}</span>
                          <span>RASS: {evo.rass}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button className="btn-secondary" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => { setPacienteSeleccionado(null); setEditandoCama(false); setEvolucionEditandoId(null); setMrcModalAbierto(false); }}>Volver</button>
              </div>
            ) : mostrarFormulario ? (
              <>
                <h2>Nueva Admisión General</h2>
                <form className="form-container" onSubmit={guardarPaciente} style={{ marginTop: '0.8rem' }}>
                  <div className="form-group"><label>Nombre y Apellido</label><input type="text" placeholder="Ej. Gómez, Ana" value={nombreForm} onChange={(e) => setNombreForm(e.target.value)} /></div>
                  <div className="form-group"><label>Institución o Procedencia</label>
                    <select value={origenForm} onChange={(e) => setOrigenForm(e.target.value)}>
                      <option value="">Seleccionar Procedencia...</option>
                      <option value="Clínica Gráficos">Clínica Gráficos</option>
                      <option value="Hospital Italiano">Hospital Italiano</option>
                      <option value="Hospital Fernández">Hospital Fernández</option>
                      <option value="Sanatorio Anchorena">Sanatorio Anchorena</option>
                      <option value="Particular / Domicilio">Particular / Domicilio</option>
                    </select>
                  </div>
                  {origenForm !== 'Particular / Domicilio' && (
                    <div className="form-group"><label>Ubicación / Cama</label><input type="text" placeholder="Box 2" value={camaForm} onChange={(e) => setCamaForm(e.target.value)} /></div>
                  )}
                  <div className="form-group"><label>Altura (cm) - Opcional</label><input type="number" placeholder="Ej. 170" value={alturaForm} onChange={(e) => setAlturaForm(e.target.value)} /></div>
                  <div className="form-group"><label>Diagnóstico</label>
                    <select value={motivoForm} onChange={(e) => setMotivoForm(e.target.value)}>
                      <option value="">Seleccionar...</option>
                      <option value="Fallo Cardiorrespiratorio">Fallo Cardiorrespiratorio</option>
                      <option value="Déficit Neurológico">Déficit Neurológico</option>
                      <option value="Traumatismo Severo">Traumatismo Severo</option>
                      <option value="Postoperatorio">Postoperatorio</option>
                      <option value="Sepsis">Sepsis</option>
                    </select>
                  </div>
                  <div className="button-group" style={{ marginTop: '1rem' }}>
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                    <button type="submit" className="btn-primary">Guardar</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2>Censo Global</h2>
                </div>
                
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Filtrar por Institución</label>
                  <select value={filtroHospitalCenso} onChange={(e) => setFiltroHospitalCenso(e.target.value)}>
                    <option value="Todos">Ver Todos</option>
                    <option value="Clínica Gráficos">Clínica Gráficos</option>
                    <option value="Hospital Italiano">Hospital Italiano</option>
                    <option value="Hospital Fernández">Hospital Fernández</option>
                    <option value="Sanatorio Anchorena">Sanatorio Anchorena</option>
                    <option value="Particular / Domicilio">Particular / Domicilio</option>
                  </select>
                </div>

                <button className="btn-admission" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => setMostrarFormulario(true)}>
                  + Agregar Nuevo Paciente
                </button>
                <div className="pacientes-list">
                  {pacientesGlobales.filter(p => filtroHospitalCenso === 'Todos' || p.origen === filtroHospitalCenso).length === 0 ? (
                    <p className="mensaje-vacio">No hay pacientes en este filtro.</p>
                  ) : (
                    pacientesGlobales.filter(p => filtroHospitalCenso === 'Todos' || p.origen === filtroHospitalCenso).map(p => (
                      <div key={p.id} className="paciente-card" onClick={() => setPacienteSeleccionado(p)}>
                        <div className="paciente-info"><h3>{p.nombre}</h3><p>{p.origen} | {p.motivo}</p></div>
                        <span className="badge">{p.cama}</span>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </section>
        </main>
      )}

      {/* MÓDULO HOSPITAL / INSTITUCIONES */}
      {pantallaGlobal === 'hospital' && (
        !ingresoConfirmado ? (
          <main className="main-content">
            <section className="dashboard-card login-card">
              <h2>Selección de Institución</h2>
              <p>Seleccione el centro médico para ver pacientes.</p>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <select value={hospitalSeleccionado} onChange={(e) => setHospitalSeleccionado(e.target.value)}>
                  <option value="">-- Seleccionar Institución --</option>
                  <option value="Clínica Gráficos">Clínica Gráficos</option>
                  <option value="Hospital Italiano">Hospital Italiano</option>
                  <option value="Hospital Fernández">Hospital Fernández</option>
                  <option value="Sanatorio Anchorena">Sanatorio Anchorena</option>
                </select>
              </div>
              <button className="btn-primary" onClick={() => { if(hospitalSeleccionado) setIngresoConfirmado(true); }} disabled={hospitalSeleccionado === ''}>
                Acceder al Servicio
              </button>
            </section>
          </main>
        ) : (
          <main className="main-content">
            <section className="dashboard-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary-color)' }}>📍 {hospitalSeleccionado}</h3>
                <button className="btn-outline" onClick={() => { setIngresoConfirmado(false); setHospitalSeleccionado(''); setPacienteSeleccionado(null); setMostrarFormulario(false); }}>Cambiar</button>
              </div>

              {pacienteSeleccionado ? (
                <div className="ficha-paciente">
                  <div className="ficha-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h2>{pacienteSeleccionado.nombre}</h2>
                        <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Procedencia: {pacienteSeleccionado.origen}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                        <button className="btn-outline" style={{ fontSize: '0.7rem', padding: '4px 6px', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => abrirPbwPaciente(pacienteSeleccionado, 'hospital')}>PBW x6/7/8</button>
                        <button className="btn-danger" style={{ fontSize: '0.7rem', padding: '4px 6px' }} onClick={() => borrarPaciente(pacienteSeleccionado.id)}>Borrar</button>
                      </div>
                    </div>
                    <p style={{ marginTop: '0.4rem' }}><strong>Cama:</strong> {pacienteSeleccionado.cama} | <strong>DX:</strong> {pacienteSeleccionado.motivo}</p>
                    {pacienteSeleccionado.mrcNota && <p style={{ marginTop: '0.3rem', color: '#10b981', fontWeight: 'bold' }}>💪 {pacienteSeleccionado.mrcNota}</p>}
                  </div>

                  <div className="button-group" style={{ marginBottom: '1rem', display: 'flex', gap: '6px' }}>
                    <button className="btn-outline" style={{ flex: 1, color: 'var(--primary-color)', borderColor: 'var(--primary-color)', fontSize: '0.8rem' }} onClick={() => copiarPaseSala(pacienteSeleccionado)}>📋 Copiar Pase</button>
                    <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => setMrcModalAbierto(!mrcModalAbierto)}>💪 {mrcModalAbierto ? 'Cerrar MRC' : 'Evaluar MRC'}</button>
                  </div>

                  {mrcModalAbierto && (
                    <div className="form-container" style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Evaluación Fuerza MRC (Bilateral)</h4>
                      {['hombro', 'codo', 'muneca', 'cadera', 'rodilla', 'tobillo'].map((m) => (
                        <div key={m} style={{ marginBottom: '0.5rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '3px' }}>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{m}</label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '2px' }}>
                            <div className="form-group"><label style={{fontSize:'0.6rem'}}>Izq (0-5)</label><input type="number" min="0" max="5" value={mrcIzq[m]} onChange={e => setMrcIzq({...mrcIzq, [m]: parseInt(e.target.value)||0})} /></div>
                            <div className="form-group"><label style={{fontSize:'0.6rem'}}>Der (0-5)</label><input type="number" min="0" max="5" value={mrcDer[m]} onChange={e => setMrcDer({...mrcDer, [m]: parseInt(e.target.value)||0})} /></div>
                          </div>
                        </div>
                      ))}
                      <button type="button" className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={guardarMrcPaciente}>Guardar MRC en Ficha</button>
                    </div>
                  )}

                  {/* PRONO TIMER */}
                  <div className="prono-card">
                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Control Decúbito Prono (SDRA)</h4>
                    {pacienteSeleccionado.pronoInicio ? (
                      <>
                        <div className="prono-time">{getPronoData(pacienteSeleccionado.pronoInicio).h}h {getPronoData(pacienteSeleccionado.pronoInicio).m}m</div>
                        {getPronoData(pacienteSeleccionado.pronoInicio).apoyo && <div className="prono-alert">⚠️ Rotar puntos de apoyo faciales y torácicos</div>}
                        <p style={{ fontSize: '0.75rem', marginBottom: '10px' }}>Faltan {getPronoData(pacienteSeleccionado.pronoInicio).faltan} hs para supinar.</p>
                        <button className="btn-secondary" style={{ color: '#1e1b4b', background: '#e0f2fe' }} onClick={toggleProno}>Finalizar Ciclo Prono</button>
                      </>
                    ) : (
                      <button className="btn-primary" style={{ marginTop: '10px', background: '#4f46e5' }} onClick={toggleProno}>▶ Iniciar Prono (16h)</button>
                    )}
                  </div>

                  <div className="evolucion-form">
                    <h3>{evolucionEditandoId ? 'Modificar Evolución' : 'Nueva Evolución Ventilatoria y Gases'}</h3>
                    <form onSubmit={guardarEvolucion}>
                      <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                        <label>Modo Ventilatorio</label>
                        <select value={modoVent} onChange={(e) => setModoVent(e.target.value)}>
                          <option value="">Seleccionar...</option>
                          <option value="VCV">VCV</option>
                          <option value="PCV">PCV</option>
                          <option value="PSV">PSV</option>
                          <option value="CPAP">CPAP</option>
                          <option value="Espontáneo">Espontáneo (AA)</option>
                        </select>
                      </div>
                      <div className="grid-ventilador" style={{ marginBottom: '0.8rem' }}>
                        <div className="form-group"><label>FiO2 (%)</label><input type="number" placeholder="40" value={fio2} onChange={(e) => setFio2(e.target.value)} /></div>
                        <div className="form-group"><label>PEEP</label><input type="number" placeholder="5" value={peep} onChange={(e) => setPeep(e.target.value)} /></div>
                        <div className="form-group"><label>Vt (ml)</label><input type="number" placeholder="450" value={vt} onChange={(e) => setVt(e.target.value)} /></div>
                        <div className="form-group"><label>FR</label><input type="number" placeholder="16" value={fr} onChange={(e) => setFr(e.target.value)} /></div>
                        <div className="form-group"><label>P. Pico</label><input type="number" placeholder="25" value={pPico} onChange={(e) => setPPico(e.target.value)} /></div>
                        <div className="form-group"><label>P. Plateau</label><input type="number" placeholder="20" value={pPlateau} onChange={(e) => setPPlateau(e.target.value)} /></div>
                        <div className="form-group"><label>Auto-PEEP</label><input type="number" placeholder="2" value={autoPeep} onChange={(e) => setAutoPeep(e.target.value)} /></div>
                        <div className="form-group"><label>Escala RASS</label>
                          <select value={rassEvo} onChange={(e) => setRassEvo(e.target.value)}>
                            <option value="">Seleccionar...</option>
                            <option value="+4 (+4 Combativo)">+4 Combativo</option>
                            <option value="+3 (+3 Muy agitado)">+3 Muy agitado</option>
                            <option value="+2 (+2 Agitado)">+2 Agitado</option>
                            <option value="+1 (+1 Inquieto)">+1 Inquieto</option>
                            <option value="0 (0 Alerta)">0 Alerta</option>
                            <option value="-1 (-1 Somnoliento)">-1 Somnoliento</option>
                            <option value="-2 (-2 Sedación leve)">-2 Sedación leve</option>
                            <option value="-3 (-3 Sedación mod.)">-3 Sedación mod.</option>
                            <option value="-4 (-4 Sedación prof.)">-4 Sedación prof.</option>
                            <option value="-5 (-5 No despierta)">-5 No despierta</option>
                          </select>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem', marginTop: '1rem' }}>Gasometría y Electrolitos</p>
                      <div className="grid-ventilador">
                        <div className="form-group"><label>pH</label><input type="number" step="0.01" placeholder="7.40" value={ph} onChange={(e) => setPh(e.target.value)} /></div>
                        <div className="form-group"><label>PaO2</label><input type="number" placeholder="90" value={pao2} onChange={(e) => setPao2(e.target.value)} /></div>
                        <div className="form-group"><label>PaCO2</label><input type="number" placeholder="40" value={paco2} onChange={(e) => setPaco2(e.target.value)} /></div>
                        <div className="form-group"><label>HCO3</label><input type="number" placeholder="24" value={hco3} onChange={(e) => setHco3(e.target.value)} /></div>
                        <div className="form-group"><label>Sodio (Na)</label><input type="number" placeholder="140" value={sodio} onChange={(e) => setSodio(e.target.value)} /></div>
                        <div className="form-group"><label>Potasio (K)</label><input type="number" step="0.1" placeholder="4.0" value={potasio} onChange={(e) => setPotasio(e.target.value)} /></div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.2rem' }}>
                        {evolucionEditandoId && (
                          <button type="button" className="btn-secondary" onClick={() => { setEvolucionEditandoId(null); setModoVent(''); setFio2(''); setPeep(''); setVt(''); setFr(''); setPPico(''); setPPlateau(''); setAutoPeep(''); setPh(''); setPao2(''); setPaco2(''); setHco3(''); setSodio(''); setPotasio(''); setRassEvo(''); }}>Cancelar</button>
                        )}
                        <button type="submit" className="btn-primary" style={{ flex: 1 }}>{evolucionEditandoId ? 'Actualizar Evolución' : 'Guardar Evolución'}</button>
                      </div>
                    </form>
                  </div>

                  <h3>Historial</h3>
                  <div className="evolucion-historial">
                    {pacienteSeleccionado.evoluciones.length === 0 ? <p className="mensaje-vacio">Sin registros.</p> : (
                      pacienteSeleccionado.evoluciones.map(evo => (
                        <div key={evo.id} className="evolucion-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <h4 style={{ margin: 0 }}>{evo.fecha} - <strong>{evo.modo}</strong></h4>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button className="btn-warning" onClick={() => cargarEvolucionParaEditar(evo)}>Modificar</button>
                              <button className="btn-danger" onClick={() => borrarEvolucion(evo.id)}>Borrar</button>
                            </div>
                          </div>
                          <div className="evolucion-data-grid">
                            <span>FiO2: {evo.fio2}%</span><span>PEEP: {evo.peep}</span>
                            <span>Vt: {evo.vt}ml</span><span>FR: {evo.fr}</span>
                            <span>P.Pico: {evo.pPico}</span><span>P.Plat: {evo.pPlateau}</span>
                            <span>Auto-PEEP: {evo.autoPeep}</span><span>pH: {evo.ph}</span>
                            <span>PaO2: {evo.pao2}</span><span>PaCO2: {evo.paco2}</span><span>HCO3: {evo.hco3}</span>
                            <span>Na: {evo.sodio}</span><span>K: {evo.potasio}</span>
                            <span>RASS: {evo.rass}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button className="btn-secondary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => { setPacienteSeleccionado(null); setEditandoCama(false); setEvolucionEditandoId(null); setMrcModalAbierto(false); }}>Volver al listado</button>
                </div>
              ) : mostrarFormulario ? (
                <form className="form-container" onSubmit={guardarPaciente}>
                  <h2>Nuevo Ingreso en {hospitalSeleccionado}</h2>
                  <div className="form-group"><label>Nombre y Apellido</label><input type="text" required value={nombreForm} onChange={e=>setNombreForm(e.target.value)} /></div>
                  <div className="form-group"><label>Cama / Box</label><input type="text" required value={camaForm} onChange={e=>setCamaForm(e.target.value)} /></div>
                  <div className="form-group"><label>Altura (cm) - Opcional</label><input type="number" value={alturaForm} onChange={e=>setAlturaForm(e.target.value)} /></div>
                  <div className="form-group"><label>Diagnóstico</label><input type="text" required value={motivoForm} onChange={e=>setMotivoForm(e.target.value)} /></div>
                  <div className="button-group"><button type="button" className="btn-secondary" onClick={()=>setMostrarFormulario(false)}>Cancelar</button><button type="submit" className="btn-primary">Guardar</button></div>
                </form>
              ) : (
                <>
                  <button className="btn-admission" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => { setOrigenForm(hospitalSeleccionado); setMostrarFormulario(true); }}>+ Nuevo Ingreso</button>
                  <div className="pacientes-list">
                    {pacientesGlobales.filter(p => p.origen === hospitalSeleccionado).length === 0 ? (
                      <p className="mensaje-vacio">No hay pacientes en esta institución.</p>
                    ) : (
                      pacientesGlobales.filter(p => p.origen === hospitalSeleccionado).map(p => (
                        <div key={p.id} className="paciente-card" onClick={() => setPacienteSeleccionado(p)}>
                          <div className="paciente-info"><h3>{p.nombre}</h3><p>Cama: {p.cama} | {p.motivo}</p></div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </section>
          </main>
        )
      )}

      {/* PCR */}
      {pantallaGlobal === 'pcr' && (
        <main className="main-content">
          <section className="dashboard-card" style={{ textAlign: 'center' }}>
            <h2>Panel de Paro Cardiorrespiratorio (ACLS)</h2>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: pcrActivo ? '#ef4444' : 'var(--text-main)', margin: '1rem 0' }}>
              {Math.floor(segundosPcr / 60)}:{segundosPcr % 60 < 10 ? '0' : ''}{segundosPcr % 60}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {!pcrActivo ? (
                <button className="btn-primary" style={{ backgroundColor: '#10b981' }} onClick={() => setPcrActivo(true)}>Iniciar PCR / Metrónomo</button>
              ) : (
                <button className="btn-danger" style={{ flex: 1 }} onClick={() => setPcrActivo(false)}>Pausar</button>
              )}
              <button className="btn-secondary" onClick={() => { setPcrActivo(false); setSegundosPcr(0); setEventosPcr([]); }}>Reiniciar</button>
            </div>

            {pcrActivo && (
              <div style={{ background: 'var(--bg-app)', border: '2px solid #ef4444', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', fontWeight: 'bold', color: '#ef4444' }}>
                🔔 METRÓNOMO ACTIVO (110 lpm)
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              <button className="btn-primary" style={{ backgroundColor: '#ef4444', fontSize: '0.85rem' }} onClick={() => registrarEventoPcr('⚡ Electro Shock / Desfibrilación')}>⚡ Registrar Shock</button>
              <button className="btn-primary" style={{ backgroundColor: '#3b82f6', fontSize: '0.85rem' }} onClick={() => registrarEventoPcr('💉 Adrenalina Administrada')}>💉 Adrenalina</button>
            </div>

            <div style={{ textAlign: 'left', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Registro de Eventos:</h3>
              <div style={{ maxHeight: '150px', overflowY: 'auto', background: 'var(--bg-app)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {eventosPcr.length === 0 ? <p className="mensaje-vacio">Ningún evento registrado aún.</p> : (
                  eventosPcr.map(ev => (
                    <div key={ev.id} style={{ fontSize: '0.8rem', padding: '4px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{ev.tipo}</span>
                      <strong style={{ color: 'var(--primary-color)' }}>[{ev.tiempo}]</strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* NOTAS */}
      {pantallaGlobal === 'notas' && (
        <main className="main-content">
          <section className="dashboard-card">
            <h2>Bloc de Notas Clínicas</h2>
            <p>Agregue notas o use el dictado por voz.</p>
            
            <form onSubmit={agregarNota} style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
              <input type="text" placeholder="Escribir nueva nota..." value={nuevaNotaTexto} onChange={(e) => setNuevaNotaTexto(e.target.value)} style={{ flex: 1, padding: '8px', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
              <button type="button" className="btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} onClick={dictarNotaVoz}>{grabando ? 'Escuchando...' : '🎙️ Voz'}</button>
              <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '8px 12px' }}>Agregar</button>
            </form>

            <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {listaNotas.length === 0 ? <p className="mensaje-vacio">No hay notas guardadas.</p> : (
                listaNotas.map(n => (
                  <div key={n.id} className="note-item">
                    <span style={{ fontSize: '0.9rem', flex: 1, color: 'var(--text-main)' }}>{n.texto}</span>
                    <button className="btn-danger" style={{ padding: '2px 6px', fontSize: '0.75rem' }} onClick={() => borrarNota(n.id)}>Borrar</button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      )}

      {/* PROTOCOLOS CLÍNICOS COMPLETOS */}
      {pantallaGlobal === 'protocolos' && (
        <main className="main-content">
          <section className="dashboard-card">
            <h2>Protocolos y Guías Clínicas</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>Toque cualquier guía para ver su desarrollo completo.</p>
            
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 1 ? null : 1)}>
                  <span>1. Ventilación Protectora en SDRA (ARDSNet)</span>
                  <span>{protocoloAbierto === 1 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 1 && (
                  <div className="protocol-accordion-content">
                    • <strong>Volumen Tidal (Vt):</strong> Meta de 4 - 8 ml/kg de Peso Corporal Predicho (PBW).<br/>
                    • <strong>Presión Plateau (P. Plat):</strong> Mantener estrictamente menor a 30 cmH2O.<br/>
                    • <strong>Driving Pressure (ΔP):</strong> Menor a 15 cmH2O (P. Plateau - PEEP total).<br/>
                    • <strong>Titulación de PEEP:</strong> Utilizar tablas combinadas de FiO2 alta/baja para prevenir atelectrauma.
                  </div>
                )}
              </div>

              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 2 ? null : 2)}>
                  <span>2. Destete Ventilatorio y Weaning</span>
                  <span>{protocoloAbierto === 2 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 2 && (
                  <div className="protocol-accordion-content">
                    • <strong>Prueba de Respiración Espontánea (SBT):</strong> Realizar diariamente de 30 a 120 min con Tubo en T o PSV baja (5-8) / PEEP 5.<br/>
                    • <strong>Criterios de Éxito:</strong> PAFI mayor a 150-200 con FiO2 menor a 0.4, estabilidad hemodinámica sin vasopresores altos, Glasgow mayor a 13 y reflejos de tos conservados.<br/>
                    • <strong>Índice de Tobin (RSBI):</strong> Menor a 105 ciclos/min/L.
                  </div>
                )}
              </div>

              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 3 ? null : 3)}>
                  <span>3. Exacerbación de EPOC en VM</span>
                  <span>{protocoloAbierto === 3 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 3 && (
                  <div className="protocol-accordion-content">
                    • <strong>Manejo Kinesiológico:</strong> Prevención de hiperinsuflación dinámica.<br/>
                    • <strong>Tiempos Inspiratorios:</strong> Ajustar Ti cortos para permitir exhalación completa y prevenir Auto-PEEP severo.<br/>
                    • <strong>Monitoreo:</strong> Vigilar curvas de flujo/tiempo para detectar atrapamiento aéreo.
                  </div>
                )}
              </div>

              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 4 ? null : 4)}>
                  <span>4. Neumonía Asociada a Ventilador (NAV)</span>
                  <span>{protocoloAbierto === 4 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 4 && (
                  <div className="protocol-accordion-content">
                    • <strong>Cabecera Elevada:</strong> Mantener entre 30° y 45° de inclinación continua.<br/>
                    • <strong>Higiene Bucal:</strong> Antisépticos con clorhexidina cada 8 horas.<br/>
                    • <strong>Aspiración de Secreciones:</strong> Técnica estéril y circuitos cerrados.<br/>
                    • <strong>Evaluación Diaria de Sedación:</strong> Interrupción diaria de sedantes para test de despertar.
                  </div>
                )}
              </div>

              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 5 ? null : 5)}>
                  <span>5. Movilización Precoz y Kinesiología Motora</span>
                  <span>{protocoloAbierto === 5 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 5 && (
                  <div className="protocol-accordion-content">
                    • <strong>Objetivo:</strong> Prevenir la Debilidad Adquirida en UTI (DAUTI).<br/>
                    • <strong>Fases:</strong> Iniciar con movilizaciones pasivas/activas en cama durante las primeras 48 horas de estabilidad hemodinámica.<br/>
                    • <strong>Progreso:</strong> Sedestación al borde de la cama, bipedestación y marcha asistida con soporte.
                  </div>
                )}
              </div>

              <div className="protocol-accordion-item">
                <div className="protocol-accordion-header" onClick={() => setProtocoloAbierto(protocoloAbierto === 6 ? null : 6)}>
                  <span>6. Paciente Neuromuscular Crítico</span>
                  <span>{protocoloAbierto === 6 ? '▲' : '▼'}</span>
                </div>
                {protocoloAbierto === 6 && (
                  <div className="protocol-accordion-content">
                    • <strong>Manejo de Vía Aérea:</strong> Tos inefectiva por debilidad de músculos respiratorios.<br/>
                    • <strong>Asistencia de Tos:</strong> Técnicas de tos asistida manual (huffing y compresión tóraco-abdominal coordinada) o uso de dispositivos mecánicos de insuflación/exuflación (CoughAssist).
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* LABORATORIO AMPLIADO */}
      {pantallaGlobal === 'valores' && (
        <main className="main-content">
          <section className="dashboard-card" style={{ maxWidth: '100%' }}>
            <h2>Valores Normales de Laboratorio</h2>
            <p>Parámetros ampliados de referencia clínica.</p>
            
            <div className="lab-container-full" style={{ marginTop: '0.8rem' }}>
              <div className="lab-card-full">
                <h3>Gasometría Arterial</h3>
                <div className="lab-item-full"><span>pH:</span> <strong>7.35 - 7.45</strong></div>
                <div className="lab-item-full"><span>PaO2:</span> <strong>80 - 100 mmHg</strong></div>
                <div className="lab-item-full"><span>PaCO2:</span> <strong>35 - 45 mmHg</strong></div>
                <div className="lab-item-full"><span>HCO3:</span> <strong>22 - 26 mEq/L</strong></div>
                <div className="lab-item-full"><span>SatO2:</span> <strong>&gt; 95 %</strong></div>
              </div>

              <div className="lab-card-full">
                <h3>Electrolitos</h3>
                <div className="lab-item-full"><span>Sodio (Na):</span> <strong>135 - 145 mEq/L</strong></div>
                <div className="lab-item-full"><span>Potasio (K):</span> <strong>3.5 - 5.0 mEq/L</strong></div>
                <div className="lab-item-full"><span>Cloro (Cl):</span> <strong>98 - 106 mEq/L</strong></div>
              </div>

              <div className="lab-card-full">
                <h3>Hemograma y Coagulación</h3>
                <div className="lab-item-full"><span>Glóbulos Blancos:</span> <strong>4,500 - 11,000 /uL</strong></div>
                <div className="lab-item-full"><span>Hemoglobina:</span> <strong>12 - 16 g/dL</strong></div>
                <div className="lab-item-full"><span>Plaquetas:</span> <strong>150,000 - 450,000 /uL</strong></div>
              </div>

              <div className="lab-card-full">
                <h3>Función Renal y Metabólica</h3>
                <div className="lab-item-full"><span>Urea:</span> <strong>15 - 45 mg/dL</strong></div>
                <div className="lab-item-full"><span>Creatinina:</span> <strong>0.6 - 1.2 mg/dL</strong></div>
                <div className="lab-item-full"><span>Glucemia:</span> <strong>70 - 110 mg/dL</strong></div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* AGENDA Y CALENDARIO */}
      {pantallaGlobal === 'agenda' && (
        <main className="main-content">
          <section className="dashboard-card">
            <h2>Agenda Profesional</h2>
            
            <div style={{ display: 'flex', gap: '0.5rem', margin: '0.8rem 0' }}>
              <button className={vistaAgenda === 'lista' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '6px' }} onClick={() => setVistaAgenda('lista')}>Programación</button>
              <button className={vistaAgenda === 'calendario' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '6px' }} onClick={() => setVistaAgenda('calendario')}>Calendario Mensual</button>
            </div>

            {vistaAgenda === 'lista' ? (
              <>
                <form onSubmit={agregarEventoAgenda} className="form-container" style={{ background: 'var(--input-bg)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>Programar Guardia o Turno</p>
                  
                  <div className="form-group"><label>Tipo</label>
                    <select value={tipoAgendaForm} onChange={e => setTipoAgendaForm(e.target.value)}>
                      <option value="Guardia">Guardia</option>
                      <option value="Institución">Institución / Trabajo</option>
                      <option value="Curso">Curso / Clases</option>
                    </select>
                  </div>

                  <div className="form-group"><label>Lugar</label>
                    <select value={lugarAgendaForm} onChange={e => setLugarAgendaForm(e.target.value)}>
                      <option value="Clínica Gráficos">Clínica Gráficos</option>
                      <option value="Hospital Italiano">Hospital Italiano</option>
                      <option value="Particular">Particular / Domicilio</option>
                    </select>
                  </div>

                  <div className="form-group"><label>Rango de Fecha y Hora</label>
                    <input type="text" placeholder="Ej. Sábado 12:00 a Domingo 20:00" value={rangoInicioAgenda} onChange={e => setRangoInicioAgenda(e.target.value)} />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>+ Agregar a Agenda</button>
                </form>

                <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {listaEventosAgenda.length === 0 ? <p className="mensaje-vacio">No hay actividades programadas.</p> : (
                    listaEventosAgenda.map(ev => (
                      <div key={ev.id} className="agenda-card-modern">
                        <div className="agenda-info">
                          <h4>{ev.tipo}: {ev.lugar}</h4>
                          <p>{ev.hora}</p>
                        </div>
                        <button className="btn-danger" style={{ padding: '4px 8px' }} onClick={() => borrarEventoAgenda(ev.id)}>X</button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="calendar-modern">
                <div className="cal-header-row">
                  <button className="cal-btn" onClick={() => cambiarMes(-1)}>&lt;</button>
                  <span className="cal-month-title">{nombresMeses[mesActualCal]} {anioActualCal}</span>
                  <button className="cal-btn" onClick={() => cambiarMes(1)}>&gt;</button>
                </div>
                <div className="cal-grid">
                  <div className="cal-day-name">L</div><div className="cal-day-name">M</div><div className="cal-day-name">M</div><div className="cal-day-name">J</div><div className="cal-day-name">V</div><div className="cal-day-name">S</div><div className="cal-day-name">D</div>
                  {(() => {
                    const totalDias = obtenerDiasDelMes(mesActualCal, anioActualCal);
                    const offsetInicio = obtenerDiaInicioMes(mesActualCal, anioActualCal);
                    const celdas = [];
                    for (let i = 0; i < offsetInicio; i++) {
                      celdas.push(<div key={`empty-${i}`} className="cal-cell empty"></div>);
                    }
                    for (let d = 1; d <= totalDias; d++) {
                      const isToday = d === new Date().getDate() && mesActualCal === new Date().getMonth();
                      const eventosDelDia = listaEventosAgenda.filter(ev => ev.diaNum === d && ev.mesNum === mesActualCal);
                      celdas.push(
                        <div key={`day-${d}`} className={`cal-cell ${isToday ? 'today' : ''}`}>
                          <span className="cal-date-num">{d}</span>
                          <div className="cal-events-dots">
                            {eventosDelDia.map(ev => <div key={ev.id} className="cal-dot" title={`${ev.tipo} - ${ev.lugar}`}></div>)}
                          </div>
                        </div>
                      );
                    }
                    return celdas;
                  })()}
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      {/* IMÁGENES */}
      {pantallaGlobal === 'imagenes' && (
        <main className="main-content">
          <section className="dashboard-card">
            <h2>Estudios de Diagnóstico por Imágenes</h2>
            <p>Registro de Rx de Tórax, TC y Ecografías.</p>

            <form onSubmit={agregarImagen} className="form-container" style={{ background: 'var(--input-bg)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '1rem 0' }}>
              <div className="form-group"><label>Paciente</label>
                <select value={pacienteImgForm} onChange={e => setPacienteImgForm(e.target.value)}>
                  <option value="">Seleccionar Paciente...</option>
                  {pacientesGlobales.map(p => <option key={p.id} value={p.nombre}>{p.nombre} ({p.origen})</option>)}
                </select>
              </div>
              <div className="form-group"><label>Tipo de Estudio</label>
                <select value={tipoImgForm} onChange={(e) => setTipoImgForm(e.target.value)}>
                  <option value="Rx de Tórax">Rx de Tórax</option>
                  <option value="Tomografía Computada (TC)">Tomografía Computada (TC)</option>
                  <option value="Ecografía Pulmonar">Ecografía Pulmonar</option>
                </select>
              </div>
              <div className="form-group"><label>Hallazgos Principales</label><textarea rows="2" placeholder="Ej. Velamiento basal derecho..." value={hallazgoImgForm} onChange={(e) => setHallazgoImgForm(e.target.value)} /></div>
              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Guardar Estudio</button>
            </form>

            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {listaImagenes.length === 0 ? <p className="mensaje-vacio">No hay estudios registrados.</p> : (
                listaImagenes.map(img => (
                  <div key={img.id} className="note-item">
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{img.paciente} - {img.tipo}</strong>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{img.hallazgo}</p>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{img.fecha}</span>
                    </div>
                    <button className="btn-danger" style={{ padding: '2px 6px', fontSize: '0.75rem' }} onClick={() => setListaImagenes(listaImagenes.filter(i => i.id !== img.id))}>X</button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      )}

      {/* CONFIGURACIÓN Y MODO NOCHE */}
      {pantallaGlobal === 'perfil' && (
        <main className="main-content">
          <section className="dashboard-card">
            <h2>Configuración</h2>
            <div className="form-container" style={{ marginTop: '1rem' }}>
              <div className="form-group"><label>Nombre y Apellido</label><input type="text" value={nombrePerfil} onChange={(e) => setNombrePerfil(e.target.value)} /></div>
              <div className="form-group"><label>Matrícula Profesional</label><input type="text" value={matriculaPerfil} onChange={(e) => setMatriculaPerfil(e.target.value)} /></div>
              
              <div className="form-group" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <label style={{ margin: 0 }}>Modo Nocturno UTI</label>
                <input type="checkbox" style={{ transform: 'scale(1.4)', cursor: 'pointer' }} checked={temaOscuro} onChange={() => setTemaOscuro(!temaOscuro)} />
              </div>

              <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => alert("✅ Ajustes guardados con éxito.")}>Guardar Cambios</button>
            </div>
          </section>
        </main>
      )}

    </div>
  );
}