"""Export the approved source artwork into separate page and draggable SVG layers.
Run from the portfolio folder with the PDF workspace Python runtime.
This preserves the original PDF; only a temporary layered document is written.
"""
from pathlib import Path
import sys, math, json, re, copy, io, base64
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'tmp/pdfs/font-runtime'))
import pymupdf as fitz
from PIL import Image, ImageChops
SOURCE=ROOT/'tmp/pdfs/create_book.py'
OUT=ROOT/'crypton/public/scrapbook/design'
OUT.mkdir(parents=True,exist_ok=True)
s=SOURCE.read_text().replace("str(ROOT/'output/pdf/eswar-scrapbook-book-design.pdf')","str(ROOT/'tmp/pdfs/layered-book.pdf')")
# Public export: keep the approved layout while replacing private research details.
s=re.sub(r"wrap\('I turn[^\n]*?853,431,570,20,INK,leading=30\)", "wrap('I am a data scientist, researcher and AI/ML engineer building useful models and applications.',853,431,570,20,INK,leading=30)",s)
s=re.sub(r"text\('GITAM University /[^']*',887,791,14,INK\)", "text('GITAM University / data science + engineering',887,791,14,INK)",s)
s=re.sub(r"detail_clip\(145,338,570,238,'01',.*?\],SAGE,15,25\)", "detail_clip(145,338,570,238,'01','Professional summary','ABOUT / DATA SCIENCE',[\n 'Data scientist, researcher and AI/ML engineer.',\n 'Background in data analysis, machine learning and software.',\n 'Pursuing M.Tech in Data Science at GITAM University.',\n],SAGE,15,25)",s,flags=re.S)
s=re.sub(r"\(661,'CURRENT','Research into practice','[^']*'\)", "(661,'CURRENT','Research into practice','Data science, machine learning and native desktop applications.')",s)
s=re.sub(r"newsclip\(1178,235,302,271,.*?,-5\)", "newsclip(1178,235,302,271,'Research into practice','M.Tech Data Science at GITAM University. Data, models and useful applications.','Data analysis, software engineering and useful applications connect the work.',-5)",s,flags=re.S)
# Generate a private temporary comparison document using exactly the public copy.
reference=s.replace('layered-book.pdf','public-book-reference.pdf')
exec(compile(reference,str(SOURCE),'exec'),{'__name__':'__main__'})

# Keep the exact source calls, but group the few multi-call paper pieces.
def group_between(source,start,end,name,box,label):
 a=source.index(start);b=source.index(end,a)
 block=source[a:b]
 fn='def '+name+'():\n'+''.join(' '+line+'\n' for line in block.splitlines())
 return source[:a]+fn+f"capture_group({name}, {box!r}, {label!r})\n"+source[b:]
s=group_between(s,"note(550,225,514,303", "# paper photo clipping",'cover_title',(544,210,1075,539),'Y Eswar cover title and roles')
s=group_between(s,"note(863,689,543,145", "c.showPage()",'academic_note',(856,674,1417,845),'Current chapter: M.Tech in Data Science')
s=group_between(s,"note(145,358,570,276", "bullet_list(['Converts",'miracle_art',(140,343,724,644),'Miracle file conversion diagram')
s=group_between(s,"note(853,358,570,276", "bullet_list(['Import",'telex_art',(848,343,1432,644),'Telex teleprompter illustration')
s=group_between(s,"note(145,370,570,420", "hand('Research driven.",'academic_timeline',(140,355,724,800),'Academic timeline')
s=group_between(s,"note(856,520,560,226", "c.linkURL('mailto:",'contact_note',(851,505,1425,756),'Contact note: founder@ishuu.me')
s=s.replace("star(1025,759,77,PINK);neuron(1025,758,1.0)","capture_group(lambda: (original_star(1025,759,77,PINK), neuron(1025,758,1.0)), (940,674,1110,843), 'Neural network sticker')")
s=s.replace("star(649,638,48,SAGE);neuron(649,638,.55)","capture_group(lambda: (original_star(649,638,48,SAGE), neuron(649,638,.55)), (594,583,704,693), 'Neural network sticker')")
s=s.replace("star(649,421,66,MUSTARD);hand('hello!',609,397,39,INK)","capture_group(lambda: (original_star(649,421,66,MUSTARD), hand('hello!',609,397,39,INK)), (575,347,723,495), 'Hello sticker')")
HOOK=r'''
# Each movable piece keeps its original drawing commands and transparent paper edge.
original_star=star
original_spread=spread
frame_art=None
frame_page_index=None
def record_spread(*args):
 global frame_art
 start=len(c._code)
 result=original_spread(*args)
 if frame_art is None:
  frame_art=(list(c._code[start:]),list(c._formsinuse),dict(c._shadingUsed),dict(c._colorsUsed),copy.deepcopy(c._extgstate))
 return result
spread=record_spread
def append_frame():
 global frame_page_index
 code,forms,shading,colors,state=frame_art
 c._code.extend(code);c._formsinuse=forms;c._shadingUsed=shading;c._colorsUsed=colors;c._extgstate=state
 frame_page_index=c._pageNumber-1
 original_show()

pending=[]
layer_pages=[]
base_pages=[]
capture_depth=0
original_show=c.showPage
original_save=c.save

def capture_group(fn, box, label):
 global capture_depth
 if capture_depth:
  return fn()
 capture_depth+=1
 start=len(c._code)
 result=fn()
 code=c._code[start:]
 del c._code[start:]
 resources=(list(c._formsinuse),dict(c._shadingUsed),dict(c._colorsUsed),copy.deepcopy(c._extgstate))
 pending.append(dict(code=code,box=box,label=label,resources=resources))
 capture_depth-=1
 return result

def bounds(x,y,w,h,angle=0,pad=8):
 cx=x+w/2;cy=y+h/2;a=math.radians(angle)
 corners=[(cx+dx*math.cos(a)-dy*math.sin(a),cy+dx*math.sin(a)+dy*math.cos(a)) for dx,dy in [(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)]]
 return (min(p[0] for p in corners)-pad,min(p[1] for p in corners)-pad,max(p[0] for p in corners)+pad,max(p[1] for p in corners)+pad)

def capture_function(name, box_fn, label_fn):
 original=globals()[name]
 def wrapped(*args,**kw):
  return capture_group(lambda:original(*args,**kw),box_fn(*args,**kw),label_fn(*args,**kw))
 globals()[name]=wrapped
capture_function('polaroid',lambda x,y,w,h,angle=0:bounds(x,y,w,h,angle,10),lambda *a:'Portrait of Eswar')
capture_function('sticker',lambda text,x,y,w,col=SAGE,angle=0:bounds(x,y,w,40,angle,8),lambda text,*a:text)
capture_function('sticky',lambda x,y,w,h,heading,body,col=MUSTARD,angle=0:bounds(x,y,w,h,angle,10),lambda x,y,w,h,heading,body,*a:heading+': '+body)
capture_function('newsclip',lambda x,y,w,h,headline,col1,col2,angle=0,section='RESEARCH & PRACTICE':bounds(x,y,w,h,angle,14),lambda x,y,w,h,headline,*a:headline)
capture_function('skill_sticky',lambda name,x,y,col,angle:bounds(x,y,114,68,angle,7),lambda name,*a:name+' skill sticky')
capture_function('detail_clip',lambda x,y,w,h,*a,**kw:bounds(x,y,w,h,0,14),lambda x,y,w,h,number,heading,*a,**kw:number+' / '+heading)

def layer_show():
 base_pages.append(c._pageNumber-1)
 original_show()
 for layer in pending:
  c._code.extend(layer['code'])
  c._formsinuse,c._shadingUsed,c._colorsUsed,c._extgstate=layer['resources']
  layer_pages.append(dict(page=c._pageNumber-1,base=len(base_pages)-1,box=layer['box'],label=layer['label']))
  original_show()
 pending.clear()
c.showPage=layer_show
'''
# skill_sticky and detail_clip are defined later, so hook them just after definition.
HOOK=HOOK.replace("capture_function('skill_sticky',lambda name,x,y,col,angle:bounds(x,y,114,68,angle,7),lambda name,*a:name+' skill sticky')\n",'').replace("capture_function('detail_clip',lambda x,y,w,h,*a,**kw:bounds(x,y,w,h,0,14),lambda x,y,w,h,number,heading,*a,**kw:number+' / '+heading)\n",'')
s=s.replace('# 01 Cover / closed scrapbook',HOOK+'\n# 01 Cover / closed scrapbook')
s=s.replace('# Dedicated skills spread / eight sections, compact sticky notes',"capture_function('skill_sticky',lambda name,x,y,col,angle:bounds(x,y,114,68,angle,7),lambda name,*a:name+' skill sticky')\ncapture_function('detail_clip',lambda x,y,w,h,*a,**kw:bounds(x,y,w,h,0,14),lambda x,y,w,h,number,heading,*a,**kw:number+' / '+heading)\n\n# Dedicated skills spread / eight sections, compact sticky notes")
s=s.replace('c.showPage();c.save()', 'c.showPage();append_frame();c.save()')
ns={'__name__':'__main__','copy':copy}
exec(compile(s,str(SOURCE),'exec'),ns)
doc=fitz.open(ROOT/'tmp/pdfs/layered-book.pdf')
original=fitz.open(ROOT/'tmp/pdfs/public-book-reference.pdf')
base_pages=ns['base_pages'];layers=ns['layer_pages']
assert len(base_pages)==7,(base_pages,len(doc))
manifest={'pages':[],'cover':None}
def export_svg(page,box,path):
 old=page.cropbox
 page.set_cropbox(fitz.Rect(*box))
 svg=page.get_svg_image(text_as_path=True)
 def compress_image(match):
  data=base64.b64decode(match.group(1))
  image=Image.open(io.BytesIO(data));image.thumbnail((1254,1254))
  stream=io.BytesIO();image.save(stream,format='WEBP',quality=94)
  return 'data:image/webp;base64,'+base64.b64encode(stream.getvalue()).decode()
 svg=re.sub(r'data:image/png;base64,([A-Za-z0-9+/=\s]+)',compress_image,svg)
 path.write_text(svg)
 page.set_cropbox(old)

def make_surface(base_index,side):
 if side=='cover':box=(472,108,1137,964);name='cover'
 elif side==0:box=(108,146,800,952);name=f'page-{(base_index-1)*2}'
 else:box=(800,146,1492,952);name=f'page-{(base_index-1)*2+1}'
 x,y,x2,y2=box
 base_page=doc[base_pages[base_index]]
 export_svg(base_page,box,OUT/(name+'.svg'))
 text=original[base_index].get_textbox(fitz.Rect(*box))
 surface={'src':f'/scrapbook/design/{name}.svg','width':x2-x,'height':y2-y,'text':text,'assets':[]}
 candidates=[l for l in layers if l['base']==base_index and x <= (l['box'][0]+l['box'][2])/2 <= x2]
 # Recompose the extracted layers and compare with the approved original.
 scale=1
 base_pix=base_page.get_pixmap(matrix=fitz.Matrix(scale,scale),clip=fitz.Rect(*box),alpha=False)
 composite=Image.frombytes('RGB',(base_pix.width,base_pix.height),base_pix.samples).convert('RGBA')
 for i,l in enumerate(candidates):
  ax,ay,bx,by=l['box'];file=f'{name}-piece-{i}.svg'
  export_svg(doc[l['page']],l['box'],OUT/file)
  asset={'id':f'{name}-{i}','label':l['label'],'src':'/scrapbook/design/'+file,'x':ax-x,'y':ay-y,'width':bx-ax,'height':by-ay}
  surface['assets'].append(asset)
  pix=doc[l['page']].get_pixmap(matrix=fitz.Matrix(scale,scale),clip=fitz.Rect(*l['box']),alpha=True)
  overlay=Image.frombytes('RGBA',(pix.width,pix.height),pix.samples)
  composite.alpha_composite(overlay,(math.floor(ax)-int(x),math.floor(ay)-int(y)))
 refpix=original[base_index].get_pixmap(matrix=fitz.Matrix(scale,scale),clip=fitz.Rect(*box),alpha=False)
 ref=Image.frombytes('RGB',(refpix.width,refpix.height),refpix.samples)
 diff=ImageChops.difference(composite.convert('RGB'),ref)
 # Save QA artifacts so the page can be inspected independently of the browser.
 composite.convert('RGB').save(ROOT/f'tmp/pdfs/{name}-recomposed.png')
 from PIL import ImageStat
 error=sum(ImageStat.Stat(diff).mean)/3
 print(name,'pieces',len(candidates),'pixel mean error',round(error,4))
 assert error < 1,(name,error)
 if side=='cover':
  ref.resize((465,600)).save(OUT/'cover-preview.webp',quality=90)
 return surface
export_svg(doc[ns['frame_page_index']],(91,125,1538,1000),OUT/'book-frame.svg')
manifest['cover']=make_surface(0,'cover')
for base_index in range(1,7):
 for side in [0,1]:manifest['pages'].append(make_surface(base_index,side))
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Exported',len(manifest['pages']),'page surfaces with',sum(len(p['assets']) for p in manifest['pages']),'independently movable pieces.')
