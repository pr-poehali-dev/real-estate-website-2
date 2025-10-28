import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { useToast } from '@/hooks/use-toast'

interface Property {
  id: number
  title: string
  price: number
  rooms: number
  area: number
  floor: number
  totalFloors: number
  address: string
  district: string
  description: string
  contact: string
  image: string
}

const Index = () => {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState('main')
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: 'Двухкомнатная квартира в центре',
      price: 4500000,
      rooms: 2,
      area: 52,
      floor: 3,
      totalFloors: 9,
      address: 'ул. Карла Маркса, 56',
      district: 'Центральный',
      description: 'Уютная квартира с хорошим ремонтом',
      contact: '79519973803',
      image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg'
    }
  ])
  
  const [filters, setFilters] = useState({
    priceFrom: 0,
    priceTo: 10000000,
    rooms: 'all',
    district: 'all'
  })
  
  const [mortgageCalc, setMortgageCalc] = useState({
    price: 5000000,
    downPayment: 1000000,
    years: 15,
    rate: 12
  })

  const [newProperty, setNewProperty] = useState({
    title: '',
    price: '',
    rooms: '',
    area: '',
    floor: '',
    totalFloors: '',
    address: '',
    district: '',
    description: '',
    contact: '',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg'
  })

  const filteredProperties = properties.filter(prop => {
    if (filters.priceFrom && prop.price < filters.priceFrom) return false
    if (filters.priceTo && prop.price > filters.priceTo) return false
    if (filters.rooms !== 'all' && prop.rooms !== parseInt(filters.rooms)) return false
    if (filters.district !== 'all' && prop.district !== filters.district) return false
    return true
  })

  const calculateMortgage = () => {
    const loanAmount = mortgageCalc.price - mortgageCalc.downPayment
    const monthlyRate = mortgageCalc.rate / 100 / 12
    const months = mortgageCalc.years * 12
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const overpayment = totalPayment - loanAmount
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      overpayment: Math.round(overpayment)
    }
  }

  const mortgage = calculateMortgage()

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newProperty.title || !newProperty.price || !newProperty.rooms || !newProperty.area || !newProperty.address || !newProperty.contact) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      })
      return
    }

    const property: Property = {
      id: properties.length + 1,
      title: newProperty.title,
      price: parseInt(newProperty.price),
      rooms: parseInt(newProperty.rooms),
      area: parseInt(newProperty.area),
      floor: parseInt(newProperty.floor) || 1,
      totalFloors: parseInt(newProperty.totalFloors) || 1,
      address: newProperty.address,
      district: newProperty.district || 'Не указан',
      description: newProperty.description,
      contact: newProperty.contact,
      image: newProperty.image
    }

    setProperties([...properties, property])
    setNewProperty({
      title: '',
      price: '',
      rooms: '',
      area: '',
      floor: '',
      totalFloors: '',
      address: '',
      district: '',
      description: '',
      contact: '',
      image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg'
    })
    
    toast({
      title: "Успешно!",
      description: "Ваше объявление добавлено и ожидает проверки"
    })
    
    setActiveSection('catalog')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Building2" size={36} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Зодчий</h1>
                <p className="text-sm text-muted-foreground">Мария - Агент по недвижимости</p>
              </div>
            </div>
            <nav className="hidden lg:flex gap-5">
              <button onClick={() => setActiveSection('main')} className={`font-medium transition-colors text-sm ${activeSection === 'main' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Главная</button>
              <button onClick={() => setActiveSection('catalog')} className={`font-medium transition-colors text-sm ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Каталог</button>
              <button onClick={() => setActiveSection('add')} className={`font-medium transition-colors text-sm ${activeSection === 'add' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Подать объявление</button>
              <button onClick={() => setActiveSection('about')} className={`font-medium transition-colors text-sm ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>О компании</button>
              <button onClick={() => setActiveSection('services')} className={`font-medium transition-colors text-sm ${activeSection === 'services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Услуги</button>
              <button onClick={() => setActiveSection('mortgage')} className={`font-medium transition-colors text-sm ${activeSection === 'mortgage' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Ипотека</button>
              <button onClick={() => setActiveSection('news')} className={`font-medium transition-colors text-sm ${activeSection === 'news' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Новости</button>
              <button onClick={() => setActiveSection('contacts')} className={`font-medium transition-colors text-sm ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Контакты</button>
            </nav>
            <Button className="hidden md:flex">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 951 997 38 03
            </Button>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'main' && (
          <>
            <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-24">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-6xl font-bold mb-6">Недвижимость в Чебоксарах</h1>
                  <p className="text-2xl text-muted-foreground mb-4">Агентство "Зодчий"</p>
                  <p className="text-xl text-muted-foreground mb-8">Профессиональная помощь в покупке и продаже недвижимости. Мария - ваш личный эксперт на рынке недвижимости Чебоксар.</p>
                  <div className="flex gap-4">
                    <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                      <Icon name="Search" size={20} className="mr-2" />
                      Смотреть объекты
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setActiveSection('add')}>
                      <Icon name="Plus" size={20} className="mr-2" />
                      Подать объявление
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Почему выбирают меня</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Icon name="Award" size={56} className="mx-auto mb-4 text-primary" />
                      <CardTitle>Опыт и профессионализм</CardTitle>
                      <CardDescription>Работаю в агентстве "Зодчий" - одном из ведущих агентств недвижимости Чебоксар</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Icon name="Shield" size={56} className="mx-auto mb-4 text-primary" />
                      <CardTitle>Безопасность сделок</CardTitle>
                      <CardDescription>Полное юридическое сопровождение и проверка документов на всех этапах</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Icon name="Clock" size={56} className="mx-auto mb-4 text-primary" />
                      <CardTitle>Быстрое оформление</CardTitle>
                      <CardDescription>Помогу продать или купить недвижимость в кратчайшие сроки</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-16 bg-muted/50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">Агентство недвижимости "Зодчий"</h2>
                  <p className="text-xl text-muted-foreground mb-8">Я работаю в составе профессиональной команды агентства "Зодчий" в Чебоксарах. Мы предоставляем полный спектр услуг на рынке недвижимости: от консультаций до полного сопровождения сделок.</p>
                  <Button size="lg" onClick={() => setActiveSection('about')}>
                    Узнать больше о компании
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <>
            <section className="py-8 bg-gradient-to-r from-gray-100 to-gray-200">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4">Каталог недвижимости</h1>
                <p className="text-lg text-muted-foreground">Актуальные предложения в Чебоксарах</p>
              </div>
            </section>

            <section className="py-8 border-b">
              <div className="container mx-auto px-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Filter" size={24} />
                      Фильтры поиска
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Количество комнат</label>
                        <Select value={filters.rooms} onValueChange={(value) => setFilters({...filters, rooms: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Любое</SelectItem>
                            <SelectItem value="1">1 комната</SelectItem>
                            <SelectItem value="2">2 комнаты</SelectItem>
                            <SelectItem value="3">3 комнаты</SelectItem>
                            <SelectItem value="4">4+ комнат</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Район</label>
                        <Select value={filters.district} onValueChange={(value) => setFilters({...filters, district: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все районы</SelectItem>
                            <SelectItem value="Центральный">Центральный</SelectItem>
                            <SelectItem value="Калининский">Калининский</SelectItem>
                            <SelectItem value="Ленинский">Ленинский</SelectItem>
                            <SelectItem value="Московский">Московский</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-2 block">Цена до: {(filters.priceTo / 1000000).toFixed(1)} млн ₽</label>
                        <Slider 
                          value={[filters.priceTo]} 
                          onValueChange={([value]) => setFilters({...filters, priceTo: value})}
                          max={10000000}
                          step={100000}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold">Объявления</h2>
                  <p className="text-muted-foreground">Найдено: {filteredProperties.length} объектов</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative h-64 overflow-hidden">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{property.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Icon name="MapPin" size={16} />
                          {property.address}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-bold text-primary">{(property.price / 1000000).toFixed(1)} млн ₽</span>
                        </div>
                        {property.description && (
                          <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                        )}
                        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Icon name="Home" size={16} className="text-muted-foreground" />
                            <span>{property.rooms} комн.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Maximize" size={16} className="text-muted-foreground" />
                            <span>{property.area} м²</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Building" size={16} className="text-muted-foreground" />
                            <span>{property.floor}/{property.totalFloors} эт.</span>
                          </div>
                        </div>
                        <Button className="w-full" asChild>
                          <a href={`tel:+${property.contact}`}>
                            <Icon name="Phone" size={18} className="mr-2" />
                            Позвонить
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'add' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h1 className="text-4xl font-bold mb-8">Подать объявление</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Разместите объявление о продаже квартиры</CardTitle>
                  <CardDescription>Заполните информацию об объекте недвижимости</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitProperty} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Название объявления *</label>
                      <Input 
                        placeholder="Например: Двухкомнатная квартира в центре"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Цена (₽) *</label>
                        <Input 
                          type="number"
                          placeholder="5000000"
                          value={newProperty.price}
                          onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Количество комнат *</label>
                        <Select value={newProperty.rooms} onValueChange={(value) => setNewProperty({...newProperty, rooms: value})} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 комната</SelectItem>
                            <SelectItem value="2">2 комнаты</SelectItem>
                            <SelectItem value="3">3 комнаты</SelectItem>
                            <SelectItem value="4">4 комнаты</SelectItem>
                            <SelectItem value="5">5+ комнат</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Площадь (м²) *</label>
                        <Input 
                          type="number"
                          placeholder="52"
                          value={newProperty.area}
                          onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Этаж</label>
                        <Input 
                          type="number"
                          placeholder="5"
                          value={newProperty.floor}
                          onChange={(e) => setNewProperty({...newProperty, floor: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Этажность</label>
                        <Input 
                          type="number"
                          placeholder="9"
                          value={newProperty.totalFloors}
                          onChange={(e) => setNewProperty({...newProperty, totalFloors: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Адрес *</label>
                      <Input 
                        placeholder="ул. Ленина, 45"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Район</label>
                      <Select value={newProperty.district} onValueChange={(value) => setNewProperty({...newProperty, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите район" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Центральный">Центральный</SelectItem>
                          <SelectItem value="Калининский">Калининский</SelectItem>
                          <SelectItem value="Ленинский">Ленинский</SelectItem>
                          <SelectItem value="Московский">Московский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Описание</label>
                      <Textarea 
                        placeholder="Опишите особенности квартиры..."
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Контактный телефон *</label>
                      <Input 
                        type="tel"
                        placeholder="79519973803"
                        value={newProperty.contact}
                        onChange={(e) => setNewProperty({...newProperty, contact: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Разместить объявление
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-8">Агентство недвижимости "Зодчий"</h1>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg mb-6">Агентство недвижимости "Зодчий" - одна из ведущих компаний на рынке недвижимости Чебоксар. Мы помогаем людям находить дом мечты и успешно продавать недвижимость.</p>
                  <p className="text-lg mb-6">Я, Мария, работаю агентом в составе профессиональной команды "Зодчий" и предоставляю полный спектр услуг:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Покупка и продажа квартир в Чебоксарах</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Юридическое сопровождение сделок</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Помощь в оформлении ипотеки</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Консультации по рынку недвижимости</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Индивидуальный подход к каждому клиенту</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">500+</CardTitle>
                      <CardDescription>успешных сделок</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">15+</CardTitle>
                      <CardDescription>лет на рынке</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">200+</CardTitle>
                      <CardDescription>объектов в базе</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">100%</CardTitle>
                      <CardDescription>довольных клиентов</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'services' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-12 text-center">Услуги</h1>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Search" size={48} className="text-primary mb-4" />
                    <CardTitle>Подбор недвижимости</CardTitle>
                    <CardDescription>Помогу найти квартиру по вашим критериям: район, цена, количество комнат</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="FileCheck" size={48} className="text-primary mb-4" />
                    <CardTitle>Юридическое сопровождение</CardTitle>
                    <CardDescription>Полная проверка документов и безопасное проведение сделки с юристами агентства</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Percent" size={48} className="text-primary mb-4" />
                    <CardTitle>Помощь с ипотекой</CardTitle>
                    <CardDescription>Помогу выбрать банк с выгодными условиями и оформить ипотечный кредит</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="TrendingUp" size={48} className="text-primary mb-4" />
                    <CardTitle>Оценка недвижимости</CardTitle>
                    <CardDescription>Профессиональная оценка рыночной стоимости вашей квартиры</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Users" size={48} className="text-primary mb-4" />
                    <CardTitle>Консультации</CardTitle>
                    <CardDescription>Бесплатные консультации по всем вопросам покупки и продажи недвижимости</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Home" size={48} className="text-primary mb-4" />
                    <CardTitle>Продажа квартир</CardTitle>
                    <CardDescription>Помогу продать вашу квартиру быстро и по выгодной цене</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'mortgage' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-8">Ипотечный калькулятор</h1>
              <div className="grid lg:grid-cols-2 gap-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Параметры кредита</CardTitle>
                    <CardDescription>Рассчитайте примерный ежемесячный платеж</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Стоимость недвижимости: {(mortgageCalc.price / 1000000).toFixed(1)} млн ₽</label>
                      <Slider 
                        value={[mortgageCalc.price]} 
                        onValueChange={([value]) => setMortgageCalc({...mortgageCalc, price: value})}
                        max={20000000}
                        step={100000}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Первоначальный взнос: {(mortgageCalc.downPayment / 1000000).toFixed(1)} млн ₽</label>
                      <Slider 
                        value={[mortgageCalc.downPayment]} 
                        onValueChange={([value]) => setMortgageCalc({...mortgageCalc, downPayment: value})}
                        max={mortgageCalc.price}
                        step={100000}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Срок кредита: {mortgageCalc.years} лет</label>
                      <Slider 
                        value={[mortgageCalc.years]} 
                        onValueChange={([value]) => setMortgageCalc({...mortgageCalc, years: value})}
                        min={1}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Процентная ставка: {mortgageCalc.rate}%</label>
                      <Slider 
                        value={[mortgageCalc.rate]} 
                        onValueChange={([value]) => setMortgageCalc({...mortgageCalc, rate: value})}
                        min={1}
                        max={20}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Результаты расчета</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-b pb-4">
                        <p className="text-sm text-muted-foreground mb-1">Ежемесячный платеж</p>
                        <p className="text-4xl font-bold text-primary">{mortgage.monthlyPayment.toLocaleString()} ₽</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Сумма кредита</p>
                          <p className="text-xl font-semibold">{((mortgageCalc.price - mortgageCalc.downPayment) / 1000000).toFixed(1)} млн ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Общая сумма</p>
                          <p className="text-xl font-semibold">{(mortgage.totalPayment / 1000000).toFixed(1)} млн ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                          <p className="text-xl font-semibold text-destructive">{(mortgage.overpayment / 1000000).toFixed(1)} млн ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Срок</p>
                          <p className="text-xl font-semibold">{mortgageCalc.years * 12} мес</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle>Нужна помощь с ипотекой?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">Помогу подобрать лучшие условия в банках Чебоксар</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="secondary" size="lg" className="w-full" asChild>
                        <a href="tel:+79519973803">
                          <Icon name="Phone" size={20} className="mr-2" />
                          Позвонить Марии
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'news' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-12">Новости рынка недвижимости</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Ипотечные ставки в Чебоксарах снизились', date: '20 октября 2024', category: 'Ипотека' },
                  { title: 'Новый жилой комплекс в Центральном районе', date: '15 октября 2024', category: 'Новостройки' },
                  { title: 'Цены на вторичное жильё стабилизировались', date: '10 октября 2024', category: 'Аналитика' },
                  { title: 'Как правильно выбрать квартиру: советы эксперта', date: '5 октября 2024', category: 'Советы' },
                  { title: 'Льготные программы для молодых семей в 2024', date: '1 октября 2024', category: 'Ипотека' },
                  { title: 'Спрос на недвижимость в Чебоксарах растёт', date: '28 сентября 2024', category: 'Аналитика' }
                ].map((news, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{news.category}</Badge>
                        <span className="text-xs text-muted-foreground">{news.date}</span>
                      </div>
                      <CardTitle className="text-xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" className="p-0">
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-12">Контакты</h1>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="User" size={24} className="text-primary" />
                        Мария - Агент по недвижимости
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Агентство недвижимости "Зодчий", Чебоксары</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Phone" size={24} className="text-primary" />
                        Телефон
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href="tel:+79519973803" className="text-2xl font-semibold hover:text-primary transition-colors">+7 951 997 38 03</a>
                      <p className="text-muted-foreground mt-1">Звоните в любое время</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Building2" size={24} className="text-primary" />
                        Агентство "Зодчий"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">г. Чебоксары</p>
                      <p className="text-muted-foreground mt-1">Одно из ведущих агентств недвижимости города</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Свяжитесь со мной</CardTitle>
                    <CardDescription>Оставьте контакты, и я перезвоню вам</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input placeholder="Телефон" type="tel" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Что вас интересует?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Покупка недвижимости</SelectItem>
                        <SelectItem value="sell">Продажа недвижимости</SelectItem>
                        <SelectItem value="mortgage">Ипотека</SelectItem>
                        <SelectItem value="consultation">Консультация</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Комментарий (необязательно)" rows={3} />
                    <Button className="w-full" size="lg">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить заявку
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={32} />
                <div>
                  <p className="text-2xl font-bold">Зодчий</p>
                  <p className="text-sm text-primary-foreground/80">Мария</p>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80">Профессиональные услуги на рынке недвижимости Чебоксар</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Разделы</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><button onClick={() => setActiveSection('main')} className="hover:text-primary-foreground transition-colors">Главная</button></li>
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-primary-foreground transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('add')} className="hover:text-primary-foreground transition-colors">Подать объявление</button></li>
                <li><button onClick={() => setActiveSection('services')} className="hover:text-primary-foreground transition-colors">Услуги</button></li>
                <li><button onClick={() => setActiveSection('mortgage')} className="hover:text-primary-foreground transition-colors">Ипотека</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>+7 951 997 38 03</li>
                <li>Мария</li>
                <li>Агентство "Зодчий"</li>
                <li>г. Чебоксары</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© 2024 Мария - Агент агентства "Зодчий". Чебоксары.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
