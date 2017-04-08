function getStyle(elem,prop){
    if(elem.currentStyle){//ie
        return elem.currentStyle[prop];
    }else if(window.getComputedStyle){//��׼�����
        return getComputedStyle(elem,false)[prop];
    }else{
        return elem.style[prop]//������ʽ
    }
}
function addEvent(elem,type,handler){
    if(elem.addEventListener){
        elem.addEventListener(type,handler,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on'+type,handler);
    }else{
        elem['on'+type]=handler;
    }
}
function getClass(clsName){
    if(document.getElementsByClassName){
        return document.getElementsByClassName(clsName);
    }
    var arr = [];
    var dom = document.getElementsByTagName("*");
    for(var i=0;i<dom.length;i++){
        if(dom[i].className==clsName){
            arr.push(dom[i]);
        }
    }
    return arr;
}
function $(args){
    return new MyJq(args);
}
function MyJq(args){
    this.elements = [];
    //���ж�args������
    switch(typeof args){
        case 'function'://�Ǹ������������ĵ���������
            window.addEventListener('load',args,false);
            break;
        case 'string'://�ǲ���ѡ����,������id tag class��
            var firstLetter = args.charAt(0);//ȡ���ַ�����һ���ַ�
            //�ص㣺Ϊ$���ŷ���һ���Զ�����󣬿���$ѡ�е�Ԫ�ز�ֹһ����
            //������Ҫ������ÿһ��Ԫ�ض�����һ������¼�ɶ�ģ�
            //������Ҫ��һ�����飬�����������е�Ԫ�أ���ÿ��Ԫ�ذ��¼�
            switch (firstLetter){
                case '#'://idѡ����
                    this.elements.push(document.getElementById(args.substring(1)));
                    //��ȷ�����ص����黹�ǵ������󣬾�ֱ�Ӷ��ö�������
                    break;
                case '.'://classѡ����
                    this.elements = getClass(args.substring(1));
                    break;
                default:
                    this.elements = document.getElementsByTagName(args);
            }
            break;
        case 'object':
            this.elements.push(args);
            break;
    }
}
MyJq.prototype.addClass = function(clsName){
    for(var i=0;i<this.elements.length;i++){
        var re = new RegExp("\\b"+clsName+"\\b",'g');
        if(!re.test(this.elements[i].className)){
            this.elements[i].className += ' '+clsName;
            this.elements[i].className = MyJq.trim(this.elements[i].className);
        }
    }
    return this;//�����Ҫ��ʽ����������ԭ�ͷ�����Ҳ����this������new�����Ķ���
};
MyJq.prototype.height = function(lg){
    if(lg){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.height = lg + 'px';
        }
        return this;
    }else{
        return getStyle(this.elements[0],'height');
    }

};
//��װ�¼��ķ���
MyJq.prototype.on = function(type,selector,fn){
    if(typeof selector=='string'){//ȡ���¼�Դ���ж����¼�Դ��selector�ǲ���һ��
        for(var i=0;i<this.elements.length;i++){
            addEvent(this.elements[i],type,function(e){
                e = e||window.event;
                target = e.target||e.srcElement;
                switch(selector.charAt(0)){
                    case '.':
                        var string = target.className.split(" ");
                        for(var i=0;i<string.length;i++){
                            if(string[i]==selector.substring(1)){
                                alert(target.innerHTML);
                            }
                        }
                        break;
                    case '#':
                        if(target.id==selector.substring(1)){
                            alert(target.innerHTML);
                        }
                        break;
                    default:
                        if(target.tagName == selector.toUpperCase()){
                            alert(target.innerHTML);
                        }
                }

            });
        }
    }else if(typeof selector=='function'&&fn==""){
        for(var i=0;i<this.elements.length;i++){
            addEvent(this.elements[i],type,selector);
        }
    }else{
        return false;
    }
}
MyJq.trim = function(str){
    var re = /^\s+|\s+$/g;
    return str.replace(re,'');
};

