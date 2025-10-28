import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Property {
  id: number
  title: string
  price: number
  rooms: number
  area: number
  floor: number
  totalFloors: number
  address: string
  type: 'apartment' | 'house' | 'newbuilding'
  image: string
  district: string
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    price: 12500000,
    rooms: 2,
    area: 65,
    floor: 5,
    totalFloors: 12,
    address: 'ул. Ленина, 45',
    type: 'apartment',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Центральный'
  },
  {
    id: 2,
    title: 'Трёхкомнатная квартира с ремонтом',
    price: 18900000,
    rooms: 3,
    area: 95,
    floor: 8,
    totalFloors: 15,
    address: 'пр. Победы, 112',
    type: 'apartment',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Северный'
  },
  {
    id: 3,
    title: 'Студия в новостройке',
    price: 6200000,
    rooms: 1,
    area: 38,
    floor: 3,
    totalFloors: 20,
    address: 'ЖК "Современник", корп. 2',
    type: 'newbuilding',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Южный'
  },
  {
    id: 4,
    title: 'Просторная четырёхкомнатная квартира',
    price: 25300000,
    rooms: 4,
    area: 125,
    floor: 10,
    totalFloors: 16,
    address: 'ул. Солнечная, 8',
    type: 'apartment',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Западный'
  },
  {
    id: 5,
    title: 'Однокомнатная квартира у метро',
    price: 8100000,
    rooms: 1,
    area: 42,
    floor: 2,
    totalFloors: 9,
    address: 'ул. Космическая, 23',
    type: 'apartment',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Восточный'
  },
  {
    id: 6,
    title: 'Квартира в новом ЖК с отделкой',
    price: 14700000,
    rooms: 2,
    area: 72,
    floor: 14,
    totalFloors: 25,
    address: 'ЖК "Новый город", корп. 5',
    type: 'newbuilding',
    image: 'https://cdn.poehali.dev/projects/d5fd1063-97f6-4570-85dc-016f3e2b4ab5/files/5f9ee1e7-8db0-4f12-86c1-2097aefd6ea3.jpg',
    district: 'Центральный'
  }
]

const Index = () => {
  const [activeSection, setActiveSection] = useState('catalog')
  const [filters, setFilters] = useState({
    priceFrom: 0,
    priceTo: 30000000,
    rooms: 'all',
    areaFrom: 0,
    areaTo: 200,
    type: 'all',
    district: 'all'
  })
  
  const [mortgageCalc, setMortgageCalc] = useState({
    price: 10000000,
    downPayment: 2000000,
    years: 15,
    rate: 12
  })

  const filteredProperties = mockProperties.filter(prop => {
    if (filters.priceFrom && prop.price < filters.priceFrom) return false
    if (filters.priceTo && prop.price > filters.priceTo) return false
    if (filters.rooms !== 'all' && prop.rooms !== parseInt(filters.rooms)) return false
    if (filters.areaFrom && prop.area < filters.areaFrom) return false
    if (filters.areaTo && prop.area > filters.areaTo) return false
    if (filters.type !== 'all' && prop.type !== filters.type) return false
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building2" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-primary">PrimeEstate</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <button onClick={() => setActiveSection('catalog')} className={`font-medium transition-colors ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Каталог</button>
              <button onClick={() => setActiveSection('about')} className={`font-medium transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>О компании</button>
              <button onClick={() => setActiveSection('services')} className={`font-medium transition-colors ${activeSection === 'services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Услуги</button>
              <button onClick={() => setActiveSection('mortgage')} className={`font-medium transition-colors ${activeSection === 'mortgage' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Ипотека</button>
              <button onClick={() => setActiveSection('news')} className={`font-medium transition-colors ${activeSection === 'news' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Новости</button>
              <button onClick={() => setActiveSection('contacts')} className={`font-medium transition-colors ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Контакты</button>
            </nav>
            <Button className="hidden md:flex">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'catalog' && (
          <>
            <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
              <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold mb-4">Найдите свою идеальную недвижимость</h1>
                <p className="text-xl text-muted-foreground mb-8">Более 1000 объектов в нашей базе. Профессиональный подход к каждому клиенту.</p>
                <div className="flex gap-4">
                  <Button size="lg" className="text-lg px-8">
                    <Icon name="Search" size={20} className="mr-2" />
                    Посмотреть каталог
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setActiveSection('mortgage')}>
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Рассчитать ипотеку
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-12 border-b">
              <div className="container mx-auto px-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Filter" size={24} />
                      Фильтры поиска
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Тип недвижимости</label>
                        <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все типы</SelectItem>
                            <SelectItem value="apartment">Квартиры</SelectItem>
                            <SelectItem value="newbuilding">Новостройки</SelectItem>
                            <SelectItem value="house">Дома и участки</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
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
                            <SelectItem value="Северный">Северный</SelectItem>
                            <SelectItem value="Южный">Южный</SelectItem>
                            <SelectItem value="Западный">Западный</SelectItem>
                            <SelectItem value="Восточный">Восточный</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цена до: {(filters.priceTo / 1000000).toFixed(1)} млн ₽</label>
                        <Slider 
                          value={[filters.priceTo]} 
                          onValueChange={([value]) => setFilters({...filters, priceTo: value})}
                          max={30000000}
                          step={500000}
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
                  <h2 className="text-3xl font-bold">Каталог объектов</h2>
                  <p className="text-muted-foreground">Найдено: {filteredProperties.length} объектов</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="relative h-64 overflow-hidden">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                            {property.type === 'apartment' && 'Вторичка'}
                            {property.type === 'newbuilding' && 'Новостройка'}
                            {property.type === 'house' && 'Дом'}
                          </Badge>
                        </div>
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
                        <Button className="w-full">
                          <Icon name="Eye" size={18} className="mr-2" />
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Объекты на карте</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-96 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Map" size={64} className="mx-auto mb-4 text-primary" />
                        <p className="text-xl font-medium text-muted-foreground">Интерактивная карта объектов</p>
                        <p className="text-sm text-muted-foreground mt-2">Выберите район на карте для просмотра объектов</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-8">О компании</h1>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg mb-6">PrimeEstate — ведущая компания на рынке недвижимости с 15-летним опытом работы. Мы помогли более 5000 семей найти дом своей мечты.</p>
                  <p className="text-lg mb-6">Наши преимущества:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Профессиональная команда экспертов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Юридическое сопровождение сделок</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-primary mt-1" size={20} />
                      <span>Помощь в получении ипотеки</span>
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
                      <CardTitle className="text-4xl text-primary">15+</CardTitle>
                      <CardDescription>лет на рынке</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">5000+</CardTitle>
                      <CardDescription>довольных клиентов</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">1200+</CardTitle>
                      <CardDescription>объектов в базе</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-4xl text-primary">98%</CardTitle>
                      <CardDescription>успешных сделок</CardDescription>
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
              <h1 className="text-5xl font-bold mb-12 text-center">Наши услуги</h1>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Search" size={48} className="text-primary mb-4" />
                    <CardTitle>Подбор недвижимости</CardTitle>
                    <CardDescription>Индивидуальный подбор объектов согласно вашим требованиям и бюджету</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="FileCheck" size={48} className="text-primary mb-4" />
                    <CardTitle>Юридическое сопровождение</CardTitle>
                    <CardDescription>Полная проверка документов и безопасное проведение сделки</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Percent" size={48} className="text-primary mb-4" />
                    <CardTitle>Помощь с ипотекой</CardTitle>
                    <CardDescription>Подбор выгодных условий ипотечного кредитования в банках-партнерах</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="TrendingUp" size={48} className="text-primary mb-4" />
                    <CardTitle>Оценка недвижимости</CardTitle>
                    <CardDescription>Профессиональная оценка рыночной стоимости вашей недвижимости</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Users" size={48} className="text-primary mb-4" />
                    <CardTitle>Консультации экспертов</CardTitle>
                    <CardDescription>Бесплатные консультации по всем вопросам покупки и продажи недвижимости</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon name="Camera" size={48} className="text-primary mb-4" />
                    <CardTitle>Виртуальные туры</CardTitle>
                    <CardDescription>3D-туры по объектам для удаленного просмотра недвижимости</CardDescription>
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
                    <CardDescription>Настройте параметры для расчета ежемесячного платежа</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Стоимость недвижимости: {(mortgageCalc.price / 1000000).toFixed(1)} млн ₽</label>
                      <Slider 
                        value={[mortgageCalc.price]} 
                        onValueChange={([value]) => setMortgageCalc({...mortgageCalc, price: value})}
                        max={50000000}
                        step={500000}
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
                          <p className="text-sm text-muted-foreground mb-1">Срок кредита</p>
                          <p className="text-xl font-semibold">{mortgageCalc.years * 12} месяцев</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle>Нужна помощь с ипотекой?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">Наши эксперты помогут подобрать лучшие условия</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="secondary" size="lg" className="w-full">
                        <Icon name="Phone" size={20} className="mr-2" />
                        Получить консультацию
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
                  { title: 'Ипотечные ставки снизились до 11.5%', date: '15 октября 2024', category: 'Ипотека' },
                  { title: 'Новый жилой комплекс в центре города', date: '10 октября 2024', category: 'Новостройки' },
                  { title: 'Тренды рынка недвижимости на 2025 год', date: '5 октября 2024', category: 'Аналитика' },
                  { title: 'Как правильно выбрать квартиру: чек-лист', date: '1 октября 2024', category: 'Советы' },
                  { title: 'Льготные программы для молодых семей', date: '28 сентября 2024', category: 'Ипотека' },
                  { title: 'Рост цен на недвижимость замедлился', date: '25 сентября 2024', category: 'Аналитика' }
                ].map((news, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
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
                        <Icon name="Phone" size={24} className="text-primary" />
                        Телефон
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold">+7 (495) 123-45-67</p>
                      <p className="text-muted-foreground mt-1">Ежедневно с 9:00 до 21:00</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Mail" size={24} className="text-primary" />
                        Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">info@primeestate.ru</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="MapPin" size={24} className="text-primary" />
                        Адрес офиса
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">г. Москва, ул. Тверская, д. 10</p>
                      <p className="text-muted-foreground mt-1">БЦ "Центральный", офис 501</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Оставьте заявку</CardTitle>
                    <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input placeholder="Телефон" type="tel" />
                    <Input placeholder="Email" type="email" />
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
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={32} />
                <span className="text-2xl font-bold">PrimeEstate</span>
              </div>
              <p className="text-sm text-primary-foreground/80">Ваш надежный партнер в мире недвижимости</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-primary-foreground transition-colors">О компании</button></li>
                <li><button onClick={() => setActiveSection('services')} className="hover:text-primary-foreground transition-colors">Услуги</button></li>
                <li><button onClick={() => setActiveSection('news')} className="hover:text-primary-foreground transition-colors">Новости</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-primary-foreground transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Недвижимость</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Квартиры</li>
                <li>Новостройки</li>
                <li>Дома и участки</li>
                <li>Коммерческая недвижимость</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@primeestate.ru</li>
                <li>г. Москва, ул. Тверская, 10</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© 2024 PrimeEstate. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
