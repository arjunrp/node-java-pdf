/*
    Program to create PDF using itext pdf library,
    The java apis are called using the node-java module of nodejs.
    
*/
var java = require('java'),
    fc = '';
java.classpath.push('itextpdf-5.5.3.jar');
try{
    fc = require('fs').readFileSync('content.txt').toString();
}
catch(e){
    fc = 'Content File Not Found in current directory';
}

java.newInstance('com.itextpdf.text.Document',function(err,doc){
    if(err){console.log("Cannot create document object");return;}
    
    var chunk = java.import('com.itextpdf.text.Chunk'),
        pageSize = java.import('com.itextpdf.text.PageSize'),
        element = java.import('com.itextpdf.text.Element'),
        font = java.import('com.itextpdf.text.Font'),
        rc = java.import('com.itextpdf.text.Rectangle'),

        anchor = java.newInstanceSync('com.itextpdf.text.Anchor',"\n\nRead More");
        rectangle = java.newInstanceSync('com.itextpdf.text.Rectangle',20,10,20,10),
        fontHeading = java.newInstanceSync('com.itextpdf.text.Font',font.FontFamily.TIMES_ROMAN,16,font.BOLD),
        fontBody = java.newInstanceSync('com.itextpdf.text.Font',font.FontFamily.COURIER,14);

        file = java.newInstanceSync('java.io.FileOutputStream',"v2Hello.pdf"),
        heading = java.newInstanceSync('com.itextpdf.text.Paragraph',"My World - An Essay",fontHeading),
        phrase = java.newInstanceSync('com.itextpdf.text.Paragraph',fc,fontBody);

        java.callMethodSync(anchor,"setReference","http://www.teenink.com/nonfiction/travel_culture/article/491823/My-World/");
        java.callMethodSync(heading,"setAlignment",element.ALIGN_CENTER);
        java.callMethodSync(phrase,"setAlignment",element.ALIGN_JUSTIFIED);
        java.callMethodSync(rectangle,"setBorder",2);
        java.callMethodSync(rectangle,"setBorder",rc.BOX);
        java.callMethodSync(rectangle,"setBorderWidth",2);


        java.callStaticMethod('com.itextpdf.text.pdf.PdfWriter',"getInstance",doc,file,function(err,docu){
            if(err){ console.log(err); return;}

            java.callMethodSync(doc,"setPageSize",pageSize.A4);
            java.callMethodSync(doc,"setMargins",36,72,30,180);
            java.callMethodSync(doc,"setMarginMirroring",true);

            doc.open(function(err,res){
                if(err){
                    console.log(err);
                    return;
                }
                java.callMethodSync(doc,"add",rectangle);    
                java.callMethodSync(doc,"add",heading);
                java.callMethodSync(doc,"add",chunk.NEWLINE);
                java.callMethodSync(phrase,"add",anchor);
                java.callMethodSync(doc,"add",phrase);
                doc.close(function(err,res){
                    if(err){
                        console.log(err);
                    return;
                }
                console.log("Document Created");
            });
    });
});
});