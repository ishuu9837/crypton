import {Brain,Network,ScanLine,Database,BarChart3,ChartNoAxesCombined,Bot,Terminal,Layers} from 'lucide-react';
import icons from './tech-icons.json';
const iconPaths=icons as Record<string,string>;
const concepts={Autoencoders:Layers,'U-Net':Network,SQL:Database,'Power BI':BarChart3,Tableau:ChartNoAxesCombined,Manus:Bot,Codex:Terminal};
export default function SkillIcon({name}:{name:string}){const path=iconPaths[name];if(path)return <img className={path.endsWith('.svg')?'skill-brand-svg':''} src={path} width="18" height="18" alt=""/>;const Icon=concepts[name as keyof typeof concepts]||ScanLine;return <Icon size={17} aria-hidden="true"/>}
