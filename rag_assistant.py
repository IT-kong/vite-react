from langchain.document_loaders import OpenpyxlLoader
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.llms import Ollama

# 1. 加载你的产品手册（知识库）
loader = OpenpyxlLoader("产品手册.xlsx")
docs = loader.load()

# 2. 把文档转成“向量”（让AI能检索）
embeddings = OllamaEmbeddings(model="llama3")
db = FAISS.from_documents(docs, embeddings)

# 3. 搭建问答链
llm = Ollama(model="llama3")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever()
)

# 4. 测试：问一个客户常问的问题
question = "保温杯可以装碳酸饮料吗？"
result = qa_chain.run(question)
print("AI回答：", result)